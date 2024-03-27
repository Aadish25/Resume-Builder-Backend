import userModel from "../../../models/user.js";
import bcrypt from "bcryptjs";
import Validators from "./validators.js";
import jwt from "jsonwebtoken";

const signup = async (request, response) => {
  try {
    const { username, email, password, password_repeat } = request.body;
    const user = {
      username,
      email,
      password,
    };

    if (!username) {
      return response.status(400).send({
        msg: "Username can't be empty!!",
      });
    }
    if (!email || !Validators.ValidateEmail(email)) {
      return response.status(400).send({
        msg: "Please enter Valid Email id!!",
      });
    }
    if (!password || !Validators.ValidatePassword(password)) {
      return response.status(400).send({
        msg: "Please enter Valid Password!!",
      });
    }
    if (!password_repeat || password != password_repeat) {
      return response.status(400).send({
        msg: "Both passwords must match!!",
      });
    }

    const foundUsername = await userModel.find({ username });
    if (foundUsername.length) {
      return response.status(409).send({
        msg: "Username already in use!!",
      });
    }
    const foundEmail = await userModel.find({ email });
    if (foundEmail.length) {
      return response.status(409).send({
        msg: "email already in use!!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    const newUser = new userModel(user);
    await newUser.save();
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.SECRET_KEY,{expiresIn:"7d"}
    );
    return response.status(201).send({
      userData: user,
      token:token,
      msg: "Successfully Registered!!!",
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({
      status: "failure",
      message: "Internal server error",
    });
  }
};
export default signup;
