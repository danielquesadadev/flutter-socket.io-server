const { io } = require('../index');

const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Natos y Waor'));
bands.addBand(new Band('Recycled'));
bands.addBand(new Band('Metallica'));

console.log(bands);

io.on('connection', client => {
    
    console.log('Cliente contectado');

    client.emit('active-bands',  bands.getBands());

    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
    });

    client.on('emitir-mensaje', ( payload ) =>  {
        console.log('mensaje:' , payload);
        io.emit('mensaje:', payload)
    });

    client.on('emit-band', ( payload ) =>  {

        bands.voteBand(payload.id);
        io.emit('active-bands',  bands.getBands());

    });

    // Escuchar add-band
    client.on('add-band', ( payload ) =>  {

        const bandaNueva = new Band( payload.name );
        bands.addBand(bandaNueva);
        io.emit('active-bands',  bands.getBands());

    });

    client.on('delete-band', ( payload ) =>  {

        bands.deleteBand(payload.id);
        io.emit('active-bands',  bands.getBands());

    });
});