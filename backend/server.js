const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

//handling Uncaught Exception

process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});


//call for process.env
dotenv.config({ path: "backend/config/config.env" });

connectDB();

const server = app.listen(process.env.PORT, () => {
  console.log(`SERVER IS WORKING ON http://localhost:${process.env.PORT}`);
});

//Unhandled Promise Rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
