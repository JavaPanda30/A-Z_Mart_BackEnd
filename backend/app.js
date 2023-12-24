const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
app.use(express.json());
app.use(cookieparser());
//route imports

const product = require("./routes/productroute");
const user = require("./routes/userRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);

//middleware for error
const errormiddleware = require("./middleware/error");
app.use(errormiddleware);

module.exports = app;
