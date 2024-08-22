const urlModel = require("../models/urlModel") 


async function verifyShortID(short_id) {
    try {
        const result = await urlModel.findOne({
            shortID: short_id
        })

        if (result != null) {
            return result.longURL
            // console.log(result.longURL)
        } else {
            return "Something went wrong!"
            // console.log("Error with reading long URL")
        }
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = verifyShortID;