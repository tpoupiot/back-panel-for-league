const mongoose = require('mongoose');
const config = require('../config');

const ChampionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    portrait: {
        type: String,
        required: true,
    }
});

const Champion = mongoose.model('Champion', ChampionSchema, config.collectionName);

module.exports = Champion;
