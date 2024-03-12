import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRouter from "./router/userRouter.js";
import diseasesRouter from "./router/diseasesRouter.js";
import symptomRouter from "./router/symptomRouter.js";
import userSearchRouter from "./router/userSearchRouter.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

connectDB();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/user", userRouter);
app.use("/api/diseases", diseasesRouter);
app.use("/api/symptom", symptomRouter);
app.use("/api/user/search", userSearchRouter);

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});