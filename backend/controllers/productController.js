const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Get All Products Error:', error);
    res.status(500).json({ message: 'Server error fetching products' });
  }
};

// Get single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Get Product Error:', error);
    res.status(500).json({ message: 'Server error fetching product' });
  }
};

// Create a new product (Admin)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl, category, stock } = req.body;
    const newProduct = await Product.create({
      name,
      description,
      price,
      imageUrl,
      category,
      stock,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Create Product Error:', error);
    res.status(500).json({ message: 'Server error creating product' });
  }
};

// Update a product (Admin)
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl, category, stock } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price !== undefined ? price : product.price;
    product.imageUrl = imageUrl || product.imageUrl;
    product.category = category || product.category;
    product.stock = stock !== undefined ? stock : product.stock;

    await product.save();
    res.json(product);
  } catch (error) {
    console.error('Update Product Error:', error);
    res.status(500).json({ message: 'Server error updating product' });
  }
};

// Delete a product (Admin)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete Product Error:', error);
    res.status(500).json({ message: 'Server error deleting product' });
  }
};
