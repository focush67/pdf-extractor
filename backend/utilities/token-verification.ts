import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { db } from "./database";

config();

const secret = process.env.JWT_SECRET!;

export const verifyToken = async (token: string) => {
  const { id } = jwt.verify(token, secret) as { id: string };
  if (!id) {
    console.log("Verification failed ", id);
    return {
      id: "none",
      username: "none",
    };
  }
  const userProfile = await db.user.findUnique({
    where: {
      id,
    },
  });
  if (!userProfile) {
    console.log("No profile found");
    return {
      id: "none",
      username: "none",
    };
  }

  const user = {
    id: userProfile.id,
    username: userProfile.username,
  };

  return user;
};
