import express from "express";
import cors from "cors";
import ApiRouter from "./routes/api/route";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api", ApiRouter);

app.listen(4000, () => {
  console.log("Server running at port 4000");
});