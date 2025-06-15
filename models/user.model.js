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
}, {
    versionKey: false
});


const users = mongoose.model('users', schemaUser);
module.exports = users;

