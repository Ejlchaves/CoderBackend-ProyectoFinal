const app = require('./server.js');

const PORT = 8081
const server = app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))