const modeloClient = require('../models/client.model');

// GET - Obtener todos los clientes
const getAllClients = async (req, res) => {
    try {
        const listaClientes = await modeloClient.find();
        res.json(listaClientes);
    } catch (err) {
        console.error("Error al obtener clientes:", err);
        res.status(500).json({ 'mensaje': "Error al obtener clientes", error: err.message });
    }
};

// GET - Obtener cliente por documento
const getClientByDocument = async (req, res) => {
    try {
        const cliente = await modeloClient.findOne({ documento: req.params.documento });
        if (cliente) {
            res.json(cliente);
        } else {
            res.status(404).json({ 'mensaje': "Cliente no encontrado" });
        }
    } catch (err) {
        console.error("Error al obtener el cliente:", err);
        res.status(500).json({ 'mensaje': "Error al obtener el cliente", error: err.message });
    }
};

// POST - Crear nuevo cliente
const createClient = async (req, res) => {
    const newClient = new modeloClient({
        documento: req.body.documento,
        nombreCompleto: req.body.nombreCompleto,
        correo: req.body.correo,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        fechaNacimiento: req.body.fechaNacimiento,
        genero: req.body.genero
    });

    try {
        const savedClient = await newClient.save();
        res.status(201).json({ 'mensaje': "Cliente creado exitosamente", cliente: savedClient });
    } catch (err) {
        console.error("Error al guardar el cliente:", err);
        res.status(400).json({ 'mensaje': "Error al crear el cliente", error: err.message });
    }
};

// PUT - Actualizar cliente
const updateClient = async (req, res) => {
    const editedClient = req.body;
    try {
        const result = await modeloClient.findOneAndUpdate(
            { documento: req.params.documento },
            editedClient,
            { new: true }
        );
        if (result) {
            res.status(200).json({ 'mensaje': "Cliente actualizado exitosamente", cliente: result });
        } else {
            res.status(404).json({ 'mensaje': "Cliente no encontrado" });
        }
    } catch (err) {
        console.error("Error al actualizar el cliente:", err);
        res.status(400).json({ 'mensaje': "Error al actualizar el cliente", error: err.message });
    }
};

// DELETE - Eliminar cliente
const deleteClient = async (req, res) => {
    try {
        const result = await modeloClient.findOneAndDelete({ documento: req.params.documento });
        if (result) {
            res.status(200).json({ 'mensaje': "Cliente eliminado exitosamente" });
        } else {
            res.status(404).json({ 'mensaje': "Cliente no encontrado" });
        }
    } catch (err) {
        console.error("Error al eliminar el cliente:", err);
        res.status(500).json({ 'mensaje': "Error al eliminar el cliente", error: err.message });
    }
};

// GET - Obtener clientes por estado
const getClientsByStatus = async (req, res) => {
    try {
        const clientes = await modeloClient.find({ estado: req.params.estado });
        res.json(clientes);
    } catch (err) {
        console.error("Error al obtener clientes por estado:", err);
        res.status(500).json({ 'mensaje': "Error al obtener clientes por estado", error: err.message });
    }
};

// GET - Obtener clientes más frecuentes (por total de compras)
const getTopClients = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const clientes = await modeloClient.find()
            .sort({ totalCompras: -1 })
            .limit(limit);
        res.json(clientes);
    } catch (err) {
        console.error("Error al obtener clientes más frecuentes:", err);
        res.status(500).json({ 'mensaje': "Error al obtener clientes más frecuentes", error: err.message });
    }
};

module.exports = {
    getAllClients,
    getClientByDocument,
    createClient,
    updateClient,
    deleteClient,
    getClientsByStatus,
    getTopClients
};
