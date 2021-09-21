const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuariosController');
const videosController = require('../controllers/videosController');

module.exports = () => {

    // AGREGANDO NUEVOS USUARIOS
    router.post('/usuarios', usuariosController.agregaUsuario);

    // OBTENER USUARIO
    router.get('/usuarios/:id', usuariosController.obtenerUsuario);

    // INICIAR SESION
    router.post('/login', usuariosController.iniciarSesion);

    // CERRAR SESION
    router.post('/logout', usuariosController.cerrarSesion);

    // AGREGANDO NUEVO VIDEO 
    router.post('/videos', videosController.agregaVideo);

    // OBTENER VIDEO 
    router.get('/videos/:id', videosController.obtenerVideo);

    // OBTENER VIDEOS 
    router.get('/videos/', videosController.obtenerVideos);

    // ELIMINAR VIDEO 
    router.delete('/videos/:id', videosController.eliminarVideo);

    return router;
}