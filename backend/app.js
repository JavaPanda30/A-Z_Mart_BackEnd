const express = require("express");
const app = express();
const errormiddleware = require("./middleware/error");
app.use(express.json());
//route imports

//middleware for error

const product = require("./routes/productroute");
app.use("/api/v1", product);
app.use(errormiddleware);

module.exports = app;
