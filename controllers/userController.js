const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: 'Usuario ya existe' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashed, role });
    res.status(201).json({ msg: 'Usuario registrado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Credenciales inválidas' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const verifyToken = (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    res.json({ valid: true, user: decoded });
  });
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    // Solo el mismo usuario o un admin puede editar
    if (req.user.id !== id && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'No autorizado' });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) return res.status(400).json({ msg: 'Email ya en uso' });
      user.email = email;
    }

    if (name) user.name = name;
    if (role && req.user.role === 'admin') user.role = role; 
    
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.json({ msg: 'Usuario actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login, verifyToken, updateUser };
