const mongoose = require("mongoose")
const urlModel = require("../models/urlModel") 
    
    
// Function to insert a URL
async function insertURL(data) {
    const urlObject = new urlModel(data);
    const result = await urlObject.save();
    return result;
  }

// READ and verify URL

async function isURLThere(short_url, long_url) {
    try {
        const result = await urlModel.findOne({
            shortID: short_url
        })

        if (result != null) {
            // console.log(result)
            return result
        } else {
            const newURL = await insertURL({
                shortID: short_url,
                longURL: long_url
            })

            // console.log(newURL)
            return newURL
        }
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = isURLThere;