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
            res.status(401).json({mensaje: 'NO SE HAN ENVIADO LAS OPCIONES'})
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({error});
        next(error);
    }
};

exports.obtenerVideo = async (req, res, next) => {
    try{
        const video = await Videos.findById(req.params.id);
        res.json(video);
    }catch (e) {
        res.status(402).json({mensaje: 'OCURRIO UN ERROR'});
        console.log(e);
        next(e);
    }
}