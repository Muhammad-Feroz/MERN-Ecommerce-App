const express = require('express');
const cors = require('cors');
const port = process.env.port || 8800;

const app = express();

// App use
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// DB connection
const connectDB = require('./db/connection');
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/payment', require('./routes/payment'));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});