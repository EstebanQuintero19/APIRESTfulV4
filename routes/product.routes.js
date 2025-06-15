const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');

// Rutas de productos
router.get('/', productController.getAllProducts);
router.get('/:ref', productController.getProductByRef);
router.post('/', productController.createProduct);
router.put('/:ref', productController.updateProduct);
router.delete('/:ref', productController.deleteProduct);

module.exports = router; 