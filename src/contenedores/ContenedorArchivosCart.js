const { promises: fs } = require('fs')
const ERROR = {error: 'producto no encontrado'}
const ERROR2 = {error: 'producto ya se encuentra en carrito'}

class ContenedorArchivosCart {

    constructor(ruta) {
        this.ruta = ruta;
    }

    async sumarProdCarrito(id, id_prod) {
        try{
            const listadoCarts = await fs.readFile(this.ruta)
            let listadoCartsParse = JSON.parse(listadoCarts)     
            let cart = listadoCartsParse.find((cart) => cart.id == id)
            let prodInCart = cart.products 
            const prodToAdd = prodInCart.find((prod)=> prod.id == id_prod)
            if(!prodToAdd) {
                prodInCart.push(prodToAdd)
                await fs.writeFile(this.ruta, JSON.stringify(listadoCartsParse, null, 2), "utf-8")
                return prodDeleted
            } else {
                return ERROR2
            }
        } catch(error) {
            console.log(error)
        }

    }

    async listarProdCarrito(id) {
        try{
            const listadoCarts = await fs.readFile(this.ruta)
            const listadoCartsParse = JSON.parse(listadoCarts)     
            const cart = listadoCartsParse.find((cart) => cart.id == id)
            const prodInCart = cart.products 
            return prodInCart
        } catch(error) {
            console.log(error)
        }
    }

    async crearCarrito() {
        try{
            const listadoCarts = await fs.readFile(this.ruta)
            const listadoCartsParse = JSON.parse(listadoCarts)     
            let id;
            listadoCartsParse.length === 0 ? (id = 1) : (id = listadoCartsParse.length + 1);
            let timestamp = Date.now()
            let products = []
            const newCart = {id, timestamp, products}
            listadoCartsParse.push(newCart)
            await fs.writeFile(this.ruta, JSON.stringify(listadoCartsParse, null, 2), "utf-8")
            return newCart.id;
        } catch(error) {
            console.log(error)
        }

    }

    async borrarProdCarrito(id, id_prod) {
        try{
            const listadoCarts = await fs.readFile(this.ruta)
            let listadoCartsParse = JSON.parse(listadoCarts)     
            let cart = listadoCartsParse.find((cart) => cart.id == id)
            let prodInCart = cart.products 
            const prodToDelete = prodInCart.find((prod)=> prod.id == id_prod)
            if(prodToDelete) {
                const prodDeleted = prodInCart.filter((prod) => prod.id != id_prod)
                prodInCart = [...prodDeleted]
                await fs.writeFile(this.ruta, JSON.stringify(listadoCartsParse, null, 2), "utf-8")
                return prodDeleted
            } else {
                return ERROR
            }
        } catch(error) {
            console.log(error)
        }
    }

    async borrarCarrito(id) {
            const listadoCarts = await fs.readFile(this.ruta)
            let listadoCartsParse = JSON.parse(listadoCarts)     
            const cart = listadoCartsParse.find((cart) => cart.id == id)
            
            if (cart) {
                const filterCart = listadoCartsParse.filter((cart)=> cart.id != id);
                listadoCartsParse = [...filterCart]
                await fs.writeFile(this.ruta, JSON.stringify(listadoCartsParse, null, 2), "utf-8")
                return filterCart
             } else {
                return ERROR
        } 
    }
}

module.exports = ContenedorArchivosCart