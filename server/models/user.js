const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please enter your password']
  },
  role: {
    type: Number,
    default: 0
  },
  avatar: {
    type: String,
    default: 'https://res.cloudinary.com/dxv8p5zck/image/upload/v1606290354/avatar/avatar_cugq40.png'
  },
  token: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Create token
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET || 'THIS_IS_JWT_SECRET_TOKEN');
    this.token = token;
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
}

module.exports = mongoose.model('Users', userSchema);