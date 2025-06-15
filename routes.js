const express = require('express');
const router = express.Router();

// Importar rutas
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');

//rutas
router.use('/user', userRoutes);
router.use('/product', productRoutes);

module.exports = router; 