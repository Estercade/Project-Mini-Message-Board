const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');
const newMessageRouter = require('./routes/newMessage');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const links = [
    { href: "/", text: "Home" },
    { href: "/new", text: "New Message" },
];

// middleware to add links to req.params
app.use((req, res, next) => {
    req.links = links;
    next();
})

app.use("/", indexRouter);
app.get("/new", newMessageRouter);


app.all((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err);
})

const PORT = 3000;

app.listen(PORT, () => console.log(`My first Express app - listening on port ${PORT}!`));