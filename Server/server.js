import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import imageRoutes from "./routes/imageRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api", imageRoutes);

app.use(errorHandler);

const PORT = process.env.SERVER_PORT || 7005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
