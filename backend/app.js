const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
app.use(express.json());
app.use(cookieparser());
//route imports
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const product = require("./routes/productroute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
//middleware for error
const errormiddleware = require("./middleware/error");
app.use(errormiddleware);

module.exports = app;
