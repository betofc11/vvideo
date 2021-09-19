const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videosSchema = new Schema({
    titulo: {
        type: String,
        trim: true
    },
    fecha:{
        type: Date,
        default: Date.now()
    },
    opciones: {
        type: [String]
    }
});

module.exports = mongoose.model('Videos', videosSchema);