const { promises: fs } = require('fs')
const ERROR = {error: 'producto no encontrado'}

class ContenedorArchivosProducts {

    constructor(ruta) {
        this.ruta = ruta;
    }

    async listar(id) {
        try {const objObtenidos = await fs.readFile(this.ruta, "utf-8" )
            const objetosParse = JSON.parse(objObtenidos)
            const objEncontrado = objetosParse.find(objeto => objeto.id == id)
            return objEncontrado
    } catch (error) {
            console.log(error)
        }
    }

    async listarAll() {
        try{
            const objObtenidos = await fs.readFile(this.ruta)
            return JSON.parse(objObtenidos)
        } catch(error) {
            console.log(error)
        }
    }

    async guardar(producto) {
        try {
            const objObtenidos = await fs.readFile(this.ruta, "utf-8" )
            const objetosParse = JSON.parse(objObtenidos)
            let id; 
            objetosParse.length === 0 ? (id = 1) : (id = objetosParse.length + 1);
            let timestamp = Date.now()
            const stock = 5
            const newObj = {...producto, id, timestamp, stock};
            objetosParse.push(newObj)
            JSON.stringify(id)
            await fs.writeFile(this.ruta, JSON.stringify(objetosParse, null, 2), "utf-8")
            return newObj.id;
        } catch(resp) {console.log(resp)}
    }

    async actualizar(producto, id) {
        const objObtenidos = await fs.readFile(this.ruta, "utf-8" )
        let objetosParse = JSON.parse(objObtenidos)
        const objEncontrado = objetosParse.find(objeto => objeto.id == id)
        if (objEncontrado) {
            const filterProducto = objetosParse.filter((prod)=> prod.id != id);
            const newProducto = {id, ...producto};
            objetosParse = [...filterProducto, newProducto];
            await fs.writeFile(this.ruta, JSON.stringify(objetosParse, null, 2), "utf-8")
            return newProducto
        } else {
            return ERROR
        }
    }

    async borrar(id) {
        const objObtenidos = await fs.readFile(this.ruta, "utf-8" )
        let objetosParse = JSON.parse(objObtenidos)
        const objEncontrado = objetosParse.find(objeto => objeto.id == id)
        if (objEncontrado) {
            const filterProducto = objetosParse.filter((prod)=> prod.id != id);
            objetosParse = [...filterProducto]
            await fs.writeFile(this.ruta, JSON.stringify(objetosParse, null, 2), "utf-8")
            return filterProducto
         }else {
            return ERROR
    }}

    async borrarAll() {

    }
}

module.exports = ContenedorArchivosProducts