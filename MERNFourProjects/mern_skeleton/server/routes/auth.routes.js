import authCtrl from "../controllers/auth.controller";
import express from "express";

const router = express.Router();

router.route("/auth/signin")
    .post(authCtrl.signin);

router.route("/auth/signout")
    .get(authCtrl.signout);

export default router;