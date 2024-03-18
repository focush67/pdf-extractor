import { CorsOptions } from "cors";
import { allowedOrigins } from "./allowed-origins";

export const corsOptions: CorsOptions = {
  origin: (origin: any, callback: any) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      console.log("Allowed by CORS");
      callback(null, true);
    } else {
      callback(new Error("Not allowed as it is bloked by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
