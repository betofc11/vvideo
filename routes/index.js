const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuariosController');
const videosController = require('../controllers/videosController');

module.exports = () => {

    // AGREGANDO NUEVOS USUARIOS
    router.post('/usuarios', usuariosController.agregaUsuario);

    // OBTENER TODOS USUARIOS
    router.get('/usuarios/:id', usuariosController.obtenerUsuario);

    // OBTENER TODOS USUARIOS
    router.post('/login', usuariosController.iniciarSesion);

    // AGREGANDO NUEVO VIDEO 
    router.post('/videos', videosController.agregaVideo);

    // AGREGANDO NUEVO VIDEO 
    router.get('/videos/:id', videosController.obtenerVideo);

    return router;
}