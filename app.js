const express = require("express")
const createHash = require("./middleware/hasher");
const isURLThere = require("./middleware/validate_url")
const verifyShortID = require("./middleware/verifyShortID");
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'] // Allow the 'Content-Type' header
}));

require('dotenv').config();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies (from forms)
app.use(express.urlencoded({ extended: true }));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/hi", (req, res) => {
    res.send("Hi page!!")
})


app.get("/:short_id", async(req, res) => {

    const short_id = req.params.short_id
    const long_url = await verifyShortID(short_id)

    res.send(long_url)
})

// POST METHOD, GIVE LONG URL RECEIVE SHORT URL

app.post("/short", async(req, res) => {
    console.log(req.body);
    result = createHash(req.body.long_url)
    console.log(result)
    db_result = await isURLThere(result.short_id, result.long_url)
    console.log(db_result)
    res.send(db_result);
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});