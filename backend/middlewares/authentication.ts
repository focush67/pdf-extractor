import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";

config();

export default function Auth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  if (!token) {
    console.log("Missing token at middleware");
    return res.json({
      message: "Authetication required",
      status: 405,
    });
  }
  next();
}
