const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const session = require('express-session');
const config = require('./config.json');

// CONECTAR CON MONGO 
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://${config.MONGODB_USER}:${config.MONGODB_PASSWORD}${config.MONGODB_HOST}/${config.MONGODB_DATABASE}`, {
    useNewUrlParser: true
});

const PORT = process.env.PORT || 4000;

// CREAR EL SERVIDOR 
const app = express();

// HABILITAR BODYPARSER 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ACTIVAR SESIONES
app.use(session({
    secret: "GodNashee",
    resave: false,
    saveUninitialized: true,
    store: new RedisStore()
}))

// RUTAS DE LA APP
app.use('/', routes());


// PUERTO
app.listen(PORT, () => {
    console.log('listening on', PORT);
});