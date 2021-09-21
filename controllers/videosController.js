const Videos = require('../models/Videos');

exports.agregaVideo = async (req, res, next) => {

    const video = new Videos(req.body, next);
    console.log(req.body)
    try {
        if (video.opciones.length > 0) {
            
            await video.save();
            console.log(video);
            res.json({
                mensaje: 'Video agregando correctamente',
                video
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

exports.obtenerVideo = async (req, res, next) => {
    try{
        const video = await Videos.findById(req.params.id);
        res.json(video);
    }catch (e) {
        res.status(403).json({mensaje: 'OCURRIO UN ERROR'});
        console.log(e);
        next(e);
    }
}

exports.obtenerVideos = async (req, res, next) => {
    try{
        const video = await Videos.find({});
        res.json(video);
    }catch (e) {
        res.status(403).json({mensaje: 'OCURRIO UN ERROR'});
        console.log(e);
        next(e);
    }
}

exports.eliminarVideo = async (req, res, next) => {
    try {
        await Videos.findByIdAndDelete(req.params.id);
        res.status(200).json({mensaje: 'Elimiado correctamente'})

    } catch (error) {
        console.log(error);
        res.status(403);
        next(error);
    }
}