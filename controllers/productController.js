const Product = require('../models/productModel');

const createProduct = async (req, res) => {
  try {
    const { name, flavor, description, price, stock, image } = req.body;
    const product = new Product({ name, flavor, description, price, stock, image });
    await product.save();
    res.status(201).json({ msg: 'Producto creado', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const readAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const readOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ msg: 'Producto no encontrado' });
    res.json({ msg: 'Producto actualizado', updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: 'Producto no encontrado' });
    res.json({ msg: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createProduct,
  readAllProducts,
  readOneProduct,
  updateProduct,
  deleteProduct
};