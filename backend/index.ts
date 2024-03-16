import express from "express";
import cors from "cors";
import ApiRouter from "./routes/api/route";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL!,
    credentials: true,
  })
);
app.use("/api", ApiRouter);

app.use("/files", express.static("files"));

app.listen(4000, () => {
  console.log("Server running at port 4000");
});
