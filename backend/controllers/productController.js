const Product = require('../models/Product');

// @desc    Create a product
// @route   POST /api/products
// @access  Seller
const createProduct = async (req, res) => {
  
  const { name, price, quantity, description } = req.body;

  if (!req.user || req.user.role !== 'seller') {
    return res.status(403).json({ message: 'Not authorized as a seller' });
  }

  const product = new Product({
    name,
    price,
    quantity,
    description,
    seller: req.user._id,
  });

  try {
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error creating product:", error); // Log error
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

// @desc    Get a single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product' });
  }
};


// @desc    Buy a product (decrease quantity)
// @route   POST /api/products/:id/buy
// @access  Shopper
const buyProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product && product.quantity >= req.body.quantity) {
    product.quantity -= req.body.quantity;
    await product.save();
    res.json({ message: 'Product bought successfully' });
  } else {
    res.status(400).json({ message: 'Insufficient quantity' });
  }
};

module.exports = { createProduct, getProducts, getProductById, buyProduct };
