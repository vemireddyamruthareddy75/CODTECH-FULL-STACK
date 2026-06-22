const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    content: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model(
    "Document",
    documentSchema
);