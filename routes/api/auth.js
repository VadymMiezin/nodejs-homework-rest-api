const express = require("express");
const router = express.Router();
const { schemas } = require("../../models/user");
const { validateBody, auth, upload } = require("../../middlewares");
const ctrl = require("../../controllers/auth");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post("/verify", validateBody(schemas.emailSchema), ctrl.resendVerify);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", auth, ctrl.getCurrent);

router.post("/logout", auth, ctrl.logout);

router.patch(
  "/",
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

router.patch("/avatars", auth, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;
