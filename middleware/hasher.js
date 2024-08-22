const crypto = require('crypto');

function createHash(url) {
    const shortID = crypto.createHash('sha256').update(url).digest('hex').slice(0, 8); // Shorten the hash to 8 characters
    return {
        short_id: shortID,
        long_url: url
    };
}

// Export using CommonJS
module.exports = createHash;
