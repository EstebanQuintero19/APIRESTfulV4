const express = require('express');
const router = express.Router();

// Importar controladores
const userController = require('./controller/user.controller');
const productController = require('./controller/product.controller');
const clientController = require('./controller/client.controller');

// ===== RUTAS DE USUARIOS (Empleados/Administradores) =====
router.get('/user', userController.getAllUsers);
router.post('/user', userController.createUser);
router.put('/user/:email', userController.updateUser);
router.delete('/user/:email', userController.deleteUser);

// ===== RUTAS DE PRODUCTOS =====
router.get('/product', productController.getAllProducts);
router.get('/product/:ref', productController.getProductByRef);
router.post('/product', productController.createProduct);
router.put('/product/:ref', productController.updateProduct);
router.delete('/product/:ref', productController.deleteProduct);

// ===== RUTAS DE CLIENTES (Compradores) =====
router.get('/client', clientController.getAllClients);
router.get('/client/top', clientController.getTopClients);
router.get('/client/status/:estado', clientController.getClientsByStatus);
router.get('/client/:documento', clientController.getClientByDocument);
router.post('/client', clientController.createClient);
router.put('/client/:documento', clientController.updateClient);
router.delete('/client/:documento', clientController.deleteClient);

module.exports = router; 