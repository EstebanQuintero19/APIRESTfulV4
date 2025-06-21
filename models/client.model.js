const mongoose = require('mongoose');
require('../config/db');

const schemaClient = new mongoose.Schema({
    documento: {
        type: String,
        minlength: [7, "El documento debe tener al menos 7 caracteres"],
        maxlength: [10, "El documento debe tener como máximo 10 caracteres"],
        required: true,
        unique: true
    },
    nombreCompleto: {
        type: String,
        required: true,
        maxlength: 150
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'El correo debe ser válido']
    },
    telefono: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true,
        maxlength: 200
    },
    fechaNacimiento: {
        type: Date,
        required: true
    },
    genero: {
        type: String,
        enum: ['masculino', 'femenino', 'otro'],
        required: true
    },
    estado: {
        type: String,
        enum: ['activo', 'inactivo', 'bloqueado'],
        default: 'activo'
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
    ultimaCompra: {
        type: Date
    },
    totalCompras: {
        type: Number,
        default: 0
    }
}, {
    versionKey: false
});

const clients = mongoose.model('clients', schemaClient);
module.exports = clients;