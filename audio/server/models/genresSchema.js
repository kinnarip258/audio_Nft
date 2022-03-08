//========================== Load Modules Start ===========================

//========================== Load internal Module =========================

const mongoose = require('mongoose');

//========================== Load Modules End =============================

//============================= Model Schema Of User =============================

const genresSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createAt:{
        type: Date,
        default: Date.now
    },
});

//============================= User Model =============================
const Genres = mongoose.model('Genres', genresSchema);

//========================== Export Module Start ===========================

module.exports = Genres;

//========================== Export module end ==================================