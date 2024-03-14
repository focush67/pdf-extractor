import Router from "express";
import { db } from "../../utilities/database";
import { config } from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerSchema } from "../../validations/register";
config();
const router = Router();
const secret = process.env.JWT_SECRET!;

router.post("/", async (request, response) => {
  const data = request.body;

  const { username, password } = data.body;
  try {
    registerSchema.parse(data.body);
    const userStatus = await db.user.findMany({
      where: {
        username,
      },
    });

    if (userStatus[0]) {
      console.log("User is already registered, login please");
      return response.json({
        message: "User already registered",
        status: 302,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newSignedUser = await db.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    const userId = newSignedUser.id;

    const token = jwt.sign(
      {
        id: userId,
        username: username,
      },
      secret,
      {
        expiresIn: "1d",
      }
    );

    const responseUser = {
      username: username,
      id: newSignedUser.id,
    };

    return response.cookie("token", token).json({
      message: "User registered successfully",
      status: 200,
      user: responseUser,
    });
  } catch (error: any) {
    console.log(error.message);
    return response.json({
      message: "Internal Server Error",
      status: 500,
    });
  }
});

export default router;
