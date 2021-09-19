const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const usuariosSchema = new Schema({
    nombre: {
        type: String,
        trim: true
    },
    apellidos: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        trim: true
    }

});

usuariosSchema.pre('save', function(next){
    bcrypt.genSalt(10).then(salts => {
        bcrypt.hash(this.password, salts).then(hash => {
            this.password = hash;
            next();
        }).catch(err => next(err));
    }).catch(err => next(err));
});

module.exports = mongoose.model('Usuarios', usuariosSchema);