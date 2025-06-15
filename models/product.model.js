const mongoose = require('mongoose');
require('../config/db');

const schemaProduct = new mongoose.Schema({
    referencia: {
        type: String,
        required: [true, 'La referencia es obligatoria'],
        unique: true
    },
    nombre: {
        type: String,
        required: [true, 'Asignar un nombre es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    precio: {
        type: Number,
        default: 0,
        min: [0, 'El precio mínimo es cero']
    },
    stock: {
        type: Number,
        default: 0,
        min: [0, 'El stock mínimo es cero']
    },
    imagen: {
        type: String,
        required: [true, 'La imagen es obligatoria']
    },
    habilitado: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false

});

const Product = mongoose.model('products', schemaProduct);
module.exports = Product;