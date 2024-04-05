require("dotenv").config();
pass = process.env.PASSWORD;

const url = `mongodb+srv://Visiterr:${pass}@visitercluster.pwylm1o.mongodb.net/Visiter`;

module.exports = url;