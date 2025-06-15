const modeloUser = require('../models/user.model');

// GET - Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const listaUsuarios = await modeloUser.find();
        res.json(listaUsuarios);
    } catch (err) {
        console.error("Error al obtener usuarios:", err);
        res.status(500).json({ 'mensaje': "Error al obtener usuarios", error: err.message });
    }
};

// POST - Crear nuevo usuario
const createUser = async (req, res) => {
    const newUser = new modeloUser({
        documento: req.body.documento,
        nombreCompleto: req.body.nombreCompleto,
        fechaNacimiento: req.body.fechaNacimiento,
        correo: req.body.correo
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json({ 'mensaje': "Usuario creado exitosamente", usuario: savedUser });
    } catch (err) {
        console.error("Error al guardar el usuario:", err);
        res.status(400).json({ 'mensaje': "Error al crear el usuario", error: err.message });
    }
};

// PUT - Actualizar usuario
const updateUser = async (req, res) => {
    const editedUser = req.body;
    try {
        const result = await modeloUser.findOneAndUpdate(
            { correo: req.params.email },
            editedUser,
            { new: true }
        );
        if (result) {
            res.status(200).json({ 'mensaje': "Usuario actualizado exitosamente", usuario: result });
        } else {
            res.status(404).json({ 'mensaje': "Usuario no encontrado" });
        }
    } catch (err) {
        console.error("Error al actualizar el usuario:", err);
        res.status(400).json({ 'mensaje': "Error al actualizar el usuario", error: err.message });
    }
};

// DELETE - Eliminar usuario
const deleteUser = async (req, res) => {
    try {
        const result = await modeloUser.findOneAndDelete({ correo: req.params.email });
        if (result) {
            res.status(200).json({ 'mensaje': "Usuario eliminado exitosamente" });
        } else {
            res.status(404).json({ 'mensaje': "Usuario no encontrado" });
        }
    } catch (err) {
        console.error("Error al eliminar el usuario:", err);
        res.status(500).json({ 'mensaje': "Error al eliminar el usuario", error: err.message });
    }
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
};

