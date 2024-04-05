const express = require("express");
const app = express();
require("dotenv").config();
const url = require("./configure.js");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT;
const routes = require("../Routers/routes");

var corsoptions = {
    origin: '*'
};
app.use(express.json());
app.use(cors(corsoptions));
app.use("/", routes);

app.use((req, res) => {
    res.status(404).send("Page not found : serach for valid url");
})
const startServer = async() => {
    try {
        await mongoose.connect(url);
        console.log("Connected to the database");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (err) {
        console.error("An error occurred while connecting to the database or starting the server:", err);
    }
};

startServer();