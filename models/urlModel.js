const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/")
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Could not connect to MongoDB'))


// URL SCHEMA

const urlSchema = new mongoose.Schema({
    shortID: String,
    longURL: String
})

const URL = mongoose.model("URL", urlSchema)

module.exports = URL;