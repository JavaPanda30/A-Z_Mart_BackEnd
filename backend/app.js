const express = require("express");
const app = express();
const errormiddleware = require("./middleware/error");
app.use(express.json());
//route imports

//middleware for error
app.use(errormiddleware);

const product = require("./routes/productroute");
app.use("/api/v1", product);

module.exports = app;
