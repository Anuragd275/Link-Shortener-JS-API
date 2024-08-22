const mongoose = require("mongoose")
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Could not connect to MongoDB'))


// URL SCHEMA

const urlSchema = new mongoose.Schema({
    shortID: String,
    longURL: String
})

const URL = mongoose.model("URL", urlSchema)

module.exports = URL;