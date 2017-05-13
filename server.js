const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile("server.log", log + "\n", (err) => {
        if(err){
            console.log("Unable to append to server.log");
        }
    });
    next(); // if not called, the server will hang indefinitly
});

// app.use((req, res, next) => {
//     res.render("maintenance.hbs");
// });

// This line must be declared below the 2 other middlewares
// because in this case, we wouldn't see the maintenance.hbs file
app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});

app.get("/", (request, response) => {
    // response.send("<h1>Hello Express!</h1>");
    response.render("home.hbs", {
        pageTitle: "Home Page",
        welcomeMessage: "Hello nigga"
    });
});

app.get("/about", (req, res) => {
    res.render("about.hbs", {
        pageTitle: "About Page"
    });
});

app.get("/bad", (req, res) => {
    res.send({
        errorMessage: "Bad request!"
    });
});

app.listen(3000, () => {
    console.log("Server is up on port 3000")
});