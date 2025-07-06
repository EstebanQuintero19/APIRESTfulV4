require('dotenv').config();


const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const path = require('path');
const Product = require('./models/product.model');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: 'secreto123',
    resave: false,
    saveUninitialized: false
}));

app.use('/v4', routes);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'frontend/views'));

// Ruta de login (GET)
app.get('/login', (req, res) => {
    res.render('pages/login', { error: null });
});

// Ruta de login (POST)
app.post('/login', async (req, res) => {
    const { correo, password } = req.body;
    try {
        const user = await User.findOne({ correo });
        if (!user) {
            return res.render('pages/login', { error: 'Usuario no encontrado' });
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.render('pages/login', { error: 'Contraseña incorrecta' });
        }
        req.session.userId = user._id;
        req.session.userName = user.nombreCompleto;
        res.redirect('/');
    } catch (err) {
        res.render('pages/login', { error: 'Error en el servidor' });
    }
});

// Ruta de logout
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

// Ruta de registro (GET)
app.get('/register', (req, res) => {
    res.render('pages/register', { error: null, success: null });
});

// Ruta de registro (POST)
app.post('/register', async (req, res) => {
    const { documento, nombreCompleto, fechaNacimiento, correo, password, rol, telefono } = req.body;
    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ $or: [{ correo }, { documento }] });
        if (existingUser) {
            return res.render('pages/register', { 
                error: 'El correo o documento ya está registrado', 
                success: null 
            });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario
        const newUser = new User({
            documento,
            nombreCompleto,
            fechaNacimiento,
            correo,
            password: hashedPassword,
            rol: rol || 'vendedor',
            telefono
        });

        await newUser.save();
        res.render('pages/register', { 
            error: null, 
            success: 'Usuario registrado exitosamente. Ya puedes iniciar sesión.' 
        });
    } catch (err) {
        res.render('pages/register', { 
            error: 'Error al registrar el usuario: ' + err.message, 
            success: null 
        });
    }
});

// Middleware para proteger rutas
function requireLogin(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next();
}

// Proteger la ruta principal del catálogo
app.get('/', requireLogin, async (req, res) => {
    try {
        const products = await Product.find();
        res.render('pages/index', { products, userName: req.session.userName });
    } catch (err) {
        res.status(500).send('Error al obtener los productos');
    }
});

app.get('/about', (req, res) => {
    res.render('pages/about');
});



// Servidor
app.listen(process.env.PORT || 9090, () => {
    console.log(`Servidor corriendo en el puerto: ${process.env.PORT || 9090}`);
});
