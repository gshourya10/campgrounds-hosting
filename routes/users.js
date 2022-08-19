const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/user");
const wrapAsync = require("../utils/wrapper");
const user = require("../controllers/users");

router.get("/register", user.registerForm);

router.post("/register", wrapAsync(user.createNew));

router.get("/login", user.loginForm);

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  wrapAsync(user.login)
);

router.get("/logout", user.logout);

module.exports = router;
