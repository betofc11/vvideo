const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const session = require('cookie-session');
const config = require('./config.json');

// CONECTAR CON MONGO 
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://${config.MONGODB_USER}:${config.MONGODB_PASSWORD}${config.MONGODB_HOST}/${config.MONGODB_DATABASE}`, {
    useNewUrlParser: true
});

// CREAR EL SERVIDOR 
const app = express();

// HABILITAR BODYPARSER 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ACTIVAR SESIONES
app.use(session({
    secret: "GodNashee",
    resave: false,
    saveUninitialized: true
}))

// RUTAS DE LA APP
app.use('/', routes());


// PUERTO
app.listen(4000, () => {
    console.log('listening on', 4000);
});