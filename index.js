const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const authRouter = require("./routes/authRoutes");
const taskRouter = require("./routes/taskRoutes");
const app = express();

// MIDDLEWARES

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow credentials (cookies, authorization headers, etc.) to be sent with requests
  })
);
app.use(express.json());

// ROUTES

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/task", taskRouter);

// MONGO-DB COONNECTION

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

// GLOBAL ERROR HANDLER

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// SERVER

app.listen(process.env.PORT, () => {
  console.log(`App running on ${process.env.PORT}`);
});
