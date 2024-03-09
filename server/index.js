// dependencies
import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import { readFileSync } from "fs";

// route
import userAuthRouter from "./routes/userAuth.Route.js"
import userRouter from "./routes/user.Route.js"
import diseasesRouter from "./routes/diseases.Route.js"
// configs
const app = express();
dotenv.config();
app.use(express.json({ limit: "500mb" }));

// primary middlewares
// Enable CORS for all routes
app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:3000"],
        credentials: true, // Allow cookies with CORS
    })
);
app.use(cookieParser());
app.use(express.urlencoded({ limit: "500mb", extended: false }));

// MVC routes
app.use("/api/v1/userAuth", userAuthRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/diseases", diseasesRouter)

// Catch-all route
app.use("/", (req, res) => {
    try {
        // Assuming the file is in the same directory as your server file
        const content = readFileSync("static.html", { encoding: "utf-8" })
        res.status(200).send(content);
    } catch (error) {
        console.error('Error reading HTML file:', error);
        res.status(500).send('Internal Server Error');
    }
});

// connections
mongoose.connect(process.env.CONNECTION_URL).then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Database is connected successfully!");
        console.log(`Server is listening in the Port: ${process.env.PORT}`)
    })
}).catch((err) => {
    console.log(err)
})