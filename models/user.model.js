const mongoose = require('../config/db')

const schemaUser = new mongoose.Schema({
    documento: {
        type: String,
        minlength: [7,"El documento debe tener al menos 7 caracteres"],
        maxlength: [10,"el documento debe tener como máximo 10 caracteres"],
        required: true,
        unique: true
    },
    nombreCompleto: {
        type: String,
        required: true,
        maxlength: 150
    },
    fechaNacimiento: {
        type: Date,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'El correo debe ser válido']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },
    rol: {
        type: String,
        enum: ['vendedor', 'administrador', 'gerente'],
        default: 'vendedor'
    },
    telefono: {
        type: String,
        required: true
    },
    activo: {
        type: Boolean,
        default: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

const users = mongoose.model('users', schemaUser);
module.exports = users;

