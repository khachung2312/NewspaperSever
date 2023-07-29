const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: {
        type: String
    },

    link: {
        type: String
    },

    pubDate: {
        type: String
    },

    content: {
        type: String
    },

    contentSnippet: {
        type: String
    },

    guid: {
        type: String
    },

    isoDate: {
        type: String
    }


});

const newsModel = new mongoose.model('Newspaper', newsSchema);

module.exports = newsModel;