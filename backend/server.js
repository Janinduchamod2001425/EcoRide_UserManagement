import express from "express"; // Imports the Express framework to help build the server.
import dotenv from "dotenv"; // Imports the dotenv package, used to load environment variables from a .env file into process.env.
dotenv.config(); // Invokes the config method of dotenv to load environment variables from a .env file into process.env.
import cookieParser from "cookie-parser"; // Imports the cookie-parser middleware to parse cookies.
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"; // Imports custom middleware functions for handling errors (e.g., 404 - not found, general error handling).
import connectDB from "./config/db.js"; // Imports a function (connectDB) to connect to the database.
import userRoutes from "./routes/userRoutes.js"; // Imports the routes for user-related operations.
import packageRoutes from "./routes/packageRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import vehicleRoutes from './routes/vehicleRoutes.js';
import licenseRoutes from './routes/licenseRoute.js';

connectDB(); // Database connection - Calls the function responsible for connecting to the database.

const port = process.env.PORT || 6000; // Port Configuration

const app = express(); // Creating an Express App

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/licenses", licenseRoutes);

// Default Route
app.get("/", (req, res) => res.send("Server is ready"));

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Server Initialization
app.listen(port, () => console.log(`Server started on port ${port}`));
