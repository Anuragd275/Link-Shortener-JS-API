const urlModel = require("../models/urlModel")

async function verifyShortID(short_id) {
    try {
        const result = await urlModel.findOne({
            shortID: short_id
        });

        if (result != null) {
            return result.longURL;
        } else {
            return null; // ✅ not found — let the caller decide what to do
        }
    } catch (err) {
        console.log(err.message);
        return null; // ✅ explicit, treated same as "not found" by the route
    }
}

module.exports = verifyShortID;