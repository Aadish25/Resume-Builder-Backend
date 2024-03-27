import { request, response } from "express";
import userModel from "../../../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (request, response) => {
  try {
    const { email, password } = request.body;
    // console.log(email,password);
    if (!email) {
      return response.status(400).send({
        msg: "Email can't be Empty!!",
      });
    }
    if (!password) {
      return response.status(400).send({
        msg: "Password can't be Empty!!",
      });
    }
    const User = await userModel.find({ email });

    if (!User.length) {
      return response.status(400).send({
        msg: "User is not Registered!!!",
      });
    }
    const passMatch = await bcrypt.compareSync(password, User[0].password);
    if (!passMatch) {
      return response.status(400).send({
        msg: "Incorrect Password",
      });
    }
    const token = jwt.sign(
      { id: User[0].id, email: User[0].email },
      process.env.SECRET_KEY,{expiresIn:"7d"}
    );
    return response.status(201).send({
      msg: "Login Successfully",
      token: token,
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({
      status: "failure",
      message: "Internal server error",
    });
  }
};
export default login;
