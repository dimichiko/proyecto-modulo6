const Order = require("../models/orderModel");
const Product = require("../models/productModel");

const createOrder = async (req, res) => {
  try {
    const { items, total } = req.body;
    const userId = req.user.id;

    // Descontar stock (ya fue validado en el middleware)
    for (const item of items) {
      const producto = await Product.findById(item.product);
      producto.stock -= item.quantity;
      await producto.save();
    }

    // Crear la orden
    const newOrder = new Order({ user: userId, items, total });
    await newOrder.save();

    res
      .status(201)
      .json({ msg: "Orden creada y stock actualizado", order: newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate(
      "items.product"
    );
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("items.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json({ msg: "Estado actualizado", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: "Orden no encontrada" });

    if (order.status !== "pendiente") {
      return res
        .status(400)
        .json({ msg: "Solo se pueden cancelar órdenes pendientes" });
    }

    // Restaurar stock
    for (const item of order.items) {
      const producto = await Product.findById(item.product);
      if (producto) {
        producto.stock += item.quantity;
        await producto.save();
      }
    }

    order.status = "cancelada";
    await order.save();

    res.json({ msg: "Orden cancelada y stock restaurado", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
};
