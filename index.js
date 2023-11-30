const express = require("express");

let app = express();

let path = require("path");

// port we are listening on
const port = process.env.PORT || 3000;

// I want to use ejs
app.set("view engine", "ejs");

//how it is going to parse data
app.use( express.urlencoded( {extende: true}) );

//connect to database, pass parameters to the second part
const knex = require("knex")({
    client: "pg",
    connection: {
        host: "localhost",
        user: "postgres",
        password: "kikico",
        database: "bucket_list",
        port: 5432

    }
});

app.get("/", (req, res) => {
    // select * from country, then store it to a variable and do what we say
    knex.select().from("country").then( country => {
        // displayCountry is a html page that it shows the table, the second parameter is the data
        res.render("displayCountry", { mycountry : country});
    })
})
// Start the server listening (do it at the bottom)
app.listen( port, () => console.log("Mytravels is listening"));