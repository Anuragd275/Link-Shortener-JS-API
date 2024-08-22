const express = require("express")
const createHash = require("./middleware/hasher");
const isURLThere = require("./middleware/validate_url")
const verifyShortID = require("./middleware/verifyShortID")

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies (from forms)
app.use(express.urlencoded({ extended: true }));


app.get("/hi", (req, res) => {
    console.log("Hello!")
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



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});