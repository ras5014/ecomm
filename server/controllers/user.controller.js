import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import User from "../model/User.model.js";

export const register = expressAsyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  // Check if the user already exists
  const isExistingUser = await User.findOne({ email });

  if (isExistingUser) {
    throw new Error("User already exists");
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const newUser = await User.create({
    fullname,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    status: "success",
    message: "User created successfully",
    data: newUser,
  });
});

export const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: user,
    });
  } else {
    throw new Error("Invalid email or password");
  }
});
