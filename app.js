const express = require("express");
const app = express();
const mapURL = require("./middleware/urlMapper")
const scrapeThuttu = require("./middleware/thuttuScraper/scrapper")
const bot = require("./middleware/thuttuScraper/bot");
const checkAndSend = require("./middleware/thuttuScraper/bot");
const path = require('path');

require('dotenv').config();


// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/:shortID", async (req, res) => {
    let url_short_id = req.params.shortID;

    console.log("Short URL id: ", url_short_id);

    const long_url = await mapURL(url_short_id);

    if (long_url) {

        console.log("Long URL: ", long_url);

        await checkAndSend();

        res.redirect(301, long_url);

        console.log(`${url_short_id} ----> ${long_url}`);
        
    } else {
        res.status(404).json({ error: "Short URL not found" });
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`))
