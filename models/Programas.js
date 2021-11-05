const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const programasSchema = new Schema({
    nombre: {
        type: String,
        trim: true
    },
    siglas:{
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('Programas', programasSchema);