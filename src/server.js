const express = require('express');
const ContenedorArchivosProducts = require('./contenedores/ContenedorArchivosProducts.js');
const ContenedorArchivosCart = require('./contenedores/ContenedorArchivosCart.js');

const productsRouter = require('./routes/products.Router');
const cartRouter = require('./routes/cart.Router')

const app = express()


//Configuracion del servidor

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.use('/api/productos', productsRouter);
app.use('/api/carritos', cartRouter);

app.get('*', function(req, res) {
    res.send({status:'error', description:`ruta ${req.url} metodo ${req.method} no implementada`}
)});

module.exports = app