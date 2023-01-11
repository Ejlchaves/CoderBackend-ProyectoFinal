const express = require('express');
const ContenedorArchivosProducts = require('../contenedores/ContenedorArchivosProducts');

const {Router} = express;
const productsRouter = new Router();

const ContenedorArchivos = require('../contenedores/ContenedorArchivosProducts')

const ProductManagement = new ContenedorArchivos('./db/dbProducts.json')

//Funcion Error
function errorNoesAdmin (ruta, metodo) {
    const error = {
        error:-1,
    }
    if (ruta && metodo) {
        error.descripcion = `Ruta ${ruta} metodo ${metodo} no autorizado`
    } else {
        error.descripcion = `No autorizado`
    }

    return error
}

//Verificacion de Admin
const admin = true;

function soloAdmin (req, res, next) {
    if(!admin) {
        res.json(errorNoesAdmin(req.url, req.method))
    } else {
        next()
    }
}


// Enpoints

productsRouter.get('/', async (req, res)=>{
    const listadoProd = await ProductManagement.listarAll()

    res.send({Productos:listadoProd})
})

productsRouter.get('/:id', async (req, res)=>{
    //Logica, la ruta para llegar aca  sera /api/productos/id
    const id = req.params.id;
    const producto = await ProductManagement.listar(id)

    res.send({Producto:producto})
})

productsRouter.post('/', soloAdmin, async (req, res)=>{
    const producto = req.body;
    const nuevoProd = await ProductManagement.guardar(producto)

    res.json(nuevoProd)
})

productsRouter.put('/:id', soloAdmin, async (req, res)=>{
    const id = req.params.id;
    const producto = req.body;
    const prodUpdate = await ProductManagement.actualizar(producto, id)     

    res.json(prodUpdate)
})

productsRouter.delete('/:id', soloAdmin, async (req, res)=>{
   const id = req.params.id
   const deleteProd = await ProductManagement.borrar(id)

    res.json(deleteProd)
})

module.exports = productsRouter