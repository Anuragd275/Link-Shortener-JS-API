const express = require("express")
const createHash = require("./middleware/hasher");
const isURLThere = require("./middleware/validate_url")
const verifyShortID = require("./middleware/verifyShortID");
const path = require('path');
const cors = require('cors');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

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

// Serve the pug file
app.get('/', (req, res) => {
    res.render('index', { title: 'Link Shortener API Docs' })
});

app.get("/hi", (req, res) => {
    res.send("Hi page!!")
})


// app.get("/:short_id", async(req, res) => {

//     const short_id = req.params.short_id
//     const long_url = await verifyShortID(short_id)

//     res.send(long_url)
// })

app.get("/:short_id", async (req, res) => {
    const short_id = req.params.short_id;
    const long_url = await verifyShortID(short_id);

    // Guard: missing, or not a valid absolute URL
    let isValid = false;
    if (long_url) {
        try {
            new URL(long_url); // throws if not a valid absolute URL
            isValid = true;
        } catch (_) {
            isValid = false;
        }
    }

    if (!isValid) {
        return res.status(404).send("Short URL not found");
    }

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Redirecting...</title>
            <meta http-equiv="refresh" content="5;url=${long_url}">
            <style>
                body {
                    font-family: sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    text-align: center;
                }
                a { color: #2563eb; }
            </style>
        </head>
        <body>
            <h2>Redirecting you in <span id="countdown">5</span> seconds...</h2>
            <p>If you are not redirected automatically, <a href="${long_url}">click here</a>.</p>
            <script>
                let seconds = 5;
                const countdownEl = document.getElementById('countdown');
                const timer = setInterval(() => {
                    seconds--;
                    countdownEl.textContent = seconds;
                    if (seconds <= 0) {
                        clearInterval(timer);
                        window.location.href = "${long_url}";
                    }
                }, 1000);
            </script>
        </body>
        </html>
    `);
});
// POST METHOD, GIVE LONG URL RECEIVE SHORT URL

app.post("/short", async (req, res) => {
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
