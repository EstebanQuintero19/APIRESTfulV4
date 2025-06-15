require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/v2', routes);

// Servidor
app.listen(process.env.PORT || 9090, () => {
    console.log(`Servidor corriendo en el puerto: ${process.env.PORT || 9090}`);
});
