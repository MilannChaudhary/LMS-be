import express from "express";
import { getUserByEmail, insertUser } from "../models/user/userModel.js";
import { comparePassword, hashPassword } from "../utils/bcryptjs.js";
import { loginValidator, signUpValidator } from "../middleware/joiValidation.js";
import { signJWT } from "../utils/jwt.js";

const router = express.Router();

// User Signup

router.post("/", signUpValidator, async (req, res, next) => {
  try {
    //get the user obj
    //encrypt the password

    req.body.password = hashPassword(req.body.password);
    console.log(req.body.password);

    //imsert the user
    const user = await insertUser(req.body);

    user?._id
      ? res.json({
          status: "success",
          message: "your account has been created, you may login now",
        })
      : res.json({
          status: "Error",
          message: "Error creating user please try again later",
        });
  } catch (error) {
    let msg = error.message;
    if (msg.includes("E11000 duplicate key error collection")) {
      msg = "There is another use have used this email , try to login or use different email to signup!";
    }
    res.json({
      status: "error",
      message: msg,
    });
  }
});

// userLogin

router.post("/login", loginValidator, async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (email && password) {
      const user = await getUserByEmail(email);
      if (user?._id) {
        const isMatched = comparePassword(password, user.password);
        if (isMatched) {
          const accessJWT = signJWT({
            email: email,
          });
          user.password = undefined;
          res.json({
            status: "success",
            message: "To do Login",
            user,
            accessJWT,
          });
          return;
        }
      }
    }
    res.status(401).json({
      error: "Invalid email or password",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// userprofile

export default router;
