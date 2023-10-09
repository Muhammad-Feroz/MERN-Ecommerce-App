const express = require('express');
const router = express.Router();

const Product = require('../models/product');

router.post('/new', async (req, res) => {
  try {
    const { name } = req.body;
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    // Check if product already exists
    const isExist = await Product.findOne({ name });
    if (isExist) {
      return res.status(400).json({ message: 'Product already exists' });
    }

    const product = new Product({
      ...req.body
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { category, sort } = req.query;
    const catArray = category?.split(',');

    const products = await Product.find({
      ...(catArray?.length > 0 && { category: { $in: catArray } })
    }).sort({
      price: sort === 'asc' ? 1 : sort === 'desc' ? -1 : 0,
      createdAt: sort === 'newest' ? -1 : sort === 'oldest' ? 1 : 0,
      featured: sort === 'featured' ? -1 : 0,
    })

    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/related/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const relatedProducts = await Product.find({
      _id: { $ne: req.params.id },
      category: product.category
    }).limit(4);

    res.status(200).json({ relatedProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;