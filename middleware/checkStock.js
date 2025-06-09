const Product = require('../models/productModel');

const checkStock = async (req, res, next) => {
  try {
    const items = req.body.items;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ msg: `Producto con ID ${item.product} no encontrado` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ msg: `Stock insuficiente para ${product.name}, quedan ${product.stock}` });
      }
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = checkStock;