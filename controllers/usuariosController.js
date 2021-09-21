const Usuarios = require('../models/Usuarios');
const bcrypt = require('bcrypt');


exports.agregaUsuario = async (req, res, next) => {
    
    const usuario = new Usuarios(req.body, next);
    try {
        if (req.session.user) {
            await usuario.save();
            res.json({mensaje: 'SE AGREGO CORRECTAMENTE EL USUARIO'});
        }else{
            console.log('ERROR');
            next();
        }
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'OCURRIO UN ERROR'})
        next();
    }
};

exports.iniciarSesion = async (req, res, next) => {
    const usuario = await Usuarios.findOne({email: req.body.email});
    bcrypt.genSalt(10).then(() => {
        bcrypt.compare(req.body.password, usuario.password).then(function(result){
            if (result) {
                req.session.user = usuario;
                res.status(200).json({mensaje: 'INICIO DE SESION CORRECTO'});
            }else{
                res.status(403).json({mensaje: 'CLAVE INCORRECTA'})
            }
        }).catch((err) => {
            console.log(err);
            next(err);
        });
    }).catch((err) => {
        console.log(err);
        next(err);
    });
};

exports.cerrarSesion = async (req, res, next) => {
    if (req.session.user) {
        req.session.destroy();
        res.status(200).json({mensaje: 'SESION CERRADA'});
    }else {
        console.log('ERROR AL OBTENER LA VARIABLE DE SESION');
        res.status(403).json({mensaje: 'ERROR AL OBTENER LA VARIABLE DE SESION'})
        next();
    }
};

exports.obtenerUsuario = async (req, res, next) => {
    try{
        const usuario = await Usuarios.findById(req.params.id);
        if (req.session.user) {
            if (!usuario) {
                res.status(404).json({mensaje: 'NO EXISTE EL USUARIO SOLICITADO'});
                next();
            }
            res.json(usuario);
        }else{
            res.status(403).json({mensaje: 'NO SE HA AUTENTICADO EL USUARIO'});
            next();
        }
    }catch (e) {
        res.status(403).json({mensaje: 'OCURRIO UN ERROR'});
        console.log(e);
        next(e);
    }
}