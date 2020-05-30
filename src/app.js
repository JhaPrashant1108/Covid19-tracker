const express = require("express");
const path = require("path");
const hbs = require("hbs");
const tracker = require("./utils/tracker");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectory = path.join(__dirname, "..", "public");
const templateDirectory = path.join(__dirname, "..", "templates");
const partialsDirectory = path.join(__dirname, "..", "templates", "partials");

app.use(express.static(publicDirectory));
app.set("view engine", "hbs");
app.set("views", templateDirectory);
hbs.registerPartials(partialsDirectory);

app.get("/india", (req, res) => {
    if (!req.query.state) {
        tracker.country("india", (error, data) => {
            if (error) {
                res.render("india", {
                    message: error,
                    name: "Prashant Jha",
                });
            } else {
                res.render("india", {
                    message: data.message,
                    confirmed: data.confirmed,
                    recovered: data.recovered,
                    deaths: data.deaths,
                    name: "Prashant Jha",
                });
            }
        });
    } else {
        // res.send(req.query.state)
        tracker.state(req.query.state, (error, data) => {
            if (error) {
                res.render("india", {
                    message: error,
                    name: "Prashant Jha",
                });
            } else {
                res.render("india", {
                    message: data.message,
                    confirmed: data.confirmed,
                    recovered: data.recovered,
                    deaths: data.deaths,
                    name: "Prashant Jha",
                });
            }
        });
    }
});

app.get("/help", (req, res) => {
    res.render("help", {
        name: "Prashant Jha",
    });
});

// app.get("/data", (req, res) => {
//   if (!req.query) {
//     res.send("hi");
//   } else {
//     res.send(req.query);
//   }
// });

app.get("*", (req, res) => {
    if (!req.query.country) {
        tracker.world((error, data) => {
            if (error) {
                res.render("index", {
                    message: error,
                    name: "Prashant Jha",
                });
            } else {
                res.render("index", {
                    message: data.message,
                    confirmed: data.confirmed,
                    recovered: data.recovered,
                    deaths: data.deaths,
                    name: "Prashant Jha",
                });
            }
        });
    } else {
        tracker.country(req.query.country, (error, data) => {
            if (error) {
                res.render("index", {
                    message: error,
                    name: "Prashant Jha",
                });
            } else {
                res.render("index", {
                    message: data.message,
                    confirmed: data.confirmed,
                    recovered: data.recovered,
                    deaths: data.deaths,
                    name: "Prashant Jha",
                });
            }
        });
    }
});

// tracker.country("india", (error, data) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(data);
//   }
// });
// tracker.world((error, data) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(data);
//   }
// });
// tracker.state("asd", (error, data) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log(data);
//     }
// });

app.listen(port, () => {
    console.log("Server is running at Port:- " + port);
});
