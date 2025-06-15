const modeloProducto = require('../models/product.model');

// GET - Obtener todos los productos
const getAllProducts = async (req, res) => {
    try {
        const products = await modeloProducto.find();
        res.status(200).json(products);
    } catch (err) {
        console.error("Error al obtener los productos:", err);
        res.status(500).json({ 'mensaje': "Error al obtener los productos" });
    }
};

// GET - Obtener producto por referencia
const getProductByRef = async (req, res) => {
    let foundProduct = await modeloProducto.findOne({ referencia: req.params.ref });
    if (foundProduct) {
        res.status(200).json(foundProduct);
    } else {
        res.status(404).json({ "error": 'No se encontró el producto' });
    }
};

// POST - Crear nuevo producto
const createProduct = async (req, res) => {
    try {
        const newProduct = {
            referencia: req.body.referenciaProducto,
            nombre: req.body.nombreProducto,
            descripcion: req.body.descripcionProducto,
            precio: req.body.precioProducto,
            stock: req.body.stockProducto,
            imagen: req.body.imagenProducto,
            habilitado: true
        };

        const insertion = await modeloProducto.create(newProduct);
        res.status(201).json(insertion);
    } catch (err) {
        console.error('Error al crear el producto:', err.message);
        res.status(400).json({ mensaje: 'Error al crear el producto', error: err.message });
    }
};

// PUT - Actualizar producto
const updateProduct = async (req, res) => {
    const updateProduct = {
        referencia: req.params.ref,
        nombre: req.body.nombreProducto,
        descripcion: req.body.descripcionProducto,
        precio: req.body.precioProducto,
        stock: req.body.stockProducto,
        imagen: req.body.imagenProducto,
        habilitado: true,
    };

    try {
        const update = await modeloProducto.findOneAndUpdate({ referencia: req.params.ref },updateProduct,{ new: true });
        if (update) {
            res.status(200).json({ 'mensaje': "Actualización exitosa", producto: update });
        } else {
            res.status(404).json({ 'mensaje': "Producto no encontrado" });
        }
    } catch (err) {
        console.error("Error al actualizar el producto:", err);
        res.status(400).json({ 'mensaje': "Error al actualizar el producto" });
    }
};

// DELETE - Eliminar producto
const deleteProduct = async (req, res) => {
    const eliminacion = await modeloProducto.findOneAndDelete({ referencia: req.params.ref });
    if (eliminacion) {
        res.status(200).json({ "mensaje": "Producto eliminado exitosamente" });
    } else {
        res.status(404).json({ "mensaje": "Producto no encontrado" });
    }
};

module.exports = {
    getAllProducts,
    getProductByRef,
    createProduct,
    updateProduct,
    deleteProduct
};