const Programas = require('../models/Programas');

exports.agregaPrograma = async (req, res, next) => {

    const programa = new Programas(req.body, next);
    console.log(req.body)
    try {
        if (programa.nombre != "" && programa.siglas != "" && programa.imagen != ""|| programa.nombre != null && programa.siglas != null && programa.imagen != null) {
            
            await programa.save();
            console.log(programa);
            res.json({
                mensaje: 'Programa agregando correctamente',
                programa
            });
        }else {
            console.log('No se han enviado las opciones');
            res.status(403).json({mensaje: 'NO SE HAN ENVIADO LAS OPCIONES'})
        }
    } catch (error) {
        console.log(error);
        res.status(403).json({error});
        next(error);
    }
};

exports.obtenerPrograma = async (req, res, next) => {
    try{
        const programa = await Programas.find({siglas: req.params.siglas});
        res.json(programa);
    }catch (e) {
        res.status(403).json({mensaje: 'OCURRIO UN ERROR'});
        console.log(e);
        next(e);
    }
}

exports.obtenerProgramas = async (req, res, next) => {
    try{
        const programa = await Programas.find({});
        res.json(programa);
    }catch (e) {
        res.status(403).json({mensaje: 'OCURRIO UN ERROR'});
        console.log(e);
        next(e);
    }
}

exports.eliminarPrograma = async (req, res, next) => {
    try {
        await Programas.findByIdAndDelete(req.params.id);
        res.status(200).json({mensaje: 'Elimiado correctamente'})

    } catch (error) {
        console.log(error);
        res.status(403);
        next(error);
    }
}