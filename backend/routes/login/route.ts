import { Router } from "express";
import Auth from "../../middlewares/authentication";
import { verifyToken } from "../../utilities/token-verification";
import { db } from "../../utilities/database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
const router = Router();

config();

const secret = process.env.JWT_SECRET!;

router.get("/", Auth, async (request, response) => {
  const token = request.cookies.token;
  try {
    const profile = await verifyToken(token);
    console.log(profile);
    return response.json({
      user: profile,
      status: 200,
    });
  } catch (error: any) {
    console.log(error.message);
    return response.json({
      message: "Error occured at JWT Authentication at /login",
      status: 405,
      error: error.message,
    });
  }
});

router.post("/", async (request, response) => {
  const data = await request.body;
  const { username, password } = data.body;

  try {
    const userProfile = await db.user.findMany({
      where: {
        username,
      },
    });
    if (!userProfile) {
      return response.json({
        message: "No User found",
        status: 404,
      });
    }
    const existingHashedPassword = userProfile[0].password;
    bcrypt.compare(password, existingHashedPassword, (error, result) => {
      if (error) {
        return response.json({
          message: "Error in JWT Decoding",
          status: 500,
          error: error.message,
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            id: userProfile[0].id,
            username: userProfile[0].username,
          },
          secret,
          {
            expiresIn: "5h",
          }
        );

        const responseUser = {
          id: userProfile[0].id,
          username: userProfile[0].username,
        };

        return response.cookie("token", token).json({
          message: "Authentication Successfull",
          status: 200,
          user: responseUser,
        });
      } else {
        return response.json({
          message: "Incorrect Password",
          status: 405,
        });
      }
    });
  } catch (error: any) {
    console.log(error.message);
    return response.json({
      message: "Some error occured",
      status: 500,
      error: error.message,
    });
  }
});

router.delete("/", (_, response) => {
  response.clearCookie("token");
  return response.json({
    message: "Logged Out",
    status: 200,
  });
});

export default router;
