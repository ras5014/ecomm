import express from "express";
import dotenv from "dotenv";
import dbConnect from "../config/dbConnect.config.js";
import {
  globalErrorHandler,
  notFound,
} from "../middlewares/globalErrorHandler.js";

// Router imports
import userRoute from "../routes/user.route.js";

dotenv.config();

// Database Connection
dbConnect();

const app = express();

// middleware
app.use(express.json());

// Routes
app.use("/api/v1/", userRoute);

// Error Handler Middleware
app.use(notFound);
app.use(globalErrorHandler);

export default app;
