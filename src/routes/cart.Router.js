const express = require('express');
const ContenedorArchivosProducts = require('../contenedores/ContenedorArchivosProducts');

const {Router} = express;
const cartRouter = new Router();

const ContenedorArchivos = require('../contenedores/ContenedorArchivosCart')

const CartManagement = new ContenedorArchivos('./db/dbCart.json')



// Enpoints

cartRouter.post('/', async (req, res)=>{
    //Logica de crear un carrito nuevo vacio y devolver un id
    const newCart = await CartManagement.crearCarrito()

    res.json(newCart)
})

cartRouter.delete('/:id', async (req, res)=>{
    const id = req.params.id
    const cartBorrado = await CartManagement.borrarCarrito(id)

    res.json(cartBorrado)
})

cartRouter.get('/:id/productos', async (req, res)=>{
    //Logica, debemos poder visualizar todos los productos del carrito
    const id = req.params.id;
    const prodsInCart = await CartManagement.listarProdCarrito(id)

    res.send(prodsInCart)
})

cartRouter.post('/:id/productos/:id_prod', async (req, res)=>{
    const id = req.params.id;
    const id_prod = req.body;
    CartManagement.sumarProdCarrito(id, id_prod)

    res.json()
})

cartRouter.delete('/:id/productos/:id_prod', async (req, res)=>{
    const id = req.params.id;
    const id_prod = req.params.id_prod
    const borrarProducto = await CartManagement.borrarProdCarrito(id, id_prod)

    res.json(borrarProducto)
})

module.exports = cartRouter;