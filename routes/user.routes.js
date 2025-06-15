const express = require('express');
const router = express.Router();
//estos dos son los mismo que decir: const router = require('express').Router();

const userController = require('../controller/user.controller');

// Rutas de usuarios
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.put('/:email', userController.updateUser);
router.delete('/:email', userController.deleteUser);

module.exports = router; 