const { io } = require('../index');
// MENSAJES DE SOCKETS
io.on('connection', client => {
    
    console.log('Cliente contectado');

    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
    });

    client.on('mensaje', ( payload ) =>  {
        console.log('mensaje:' , payload);

        io.emit( 'mensaje', { admin: 'nuevo mensaje'});
    });

});