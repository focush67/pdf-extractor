import Router from "express";
import LoginRouter from "./login/route";
import RegisterRouter from "./register/route";
const router = Router();

router.use("/login",LoginRouter);
router.use("/register",RegisterRouter);

export default router;
