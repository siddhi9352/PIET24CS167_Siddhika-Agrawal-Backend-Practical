const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        min: 1
    },

    category: {
        type: String
    },

    isAvailable: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Book', bookSchema);