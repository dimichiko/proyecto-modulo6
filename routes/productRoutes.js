const express = require('express');
const router = express.Router();
const controlador = require('../controllers/productController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Rutas CRUD de productos
router.post('/create', verifyToken, isAdmin, controlador.createProduct);
router.get('/readall', controlador.readAllProducts);
router.get('/readone/:id', controlador.readOneProduct);
router.put('/update/:id', verifyToken, isAdmin, controlador.updateProduct);
router.delete('/delete/:id', verifyToken, isAdmin, controlador.deleteProduct);

module.exports = router;