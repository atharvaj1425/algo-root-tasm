import { User } from "../models/users.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// Register Controller
export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = generateToken(user);

    res.status(201).json(new ApiResponse(201, { token }, "User registered successfully"));
  } catch (error) {
    next(error);
  }
};

// Login Controller
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    // Validate input
    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(401, "Invalid email");
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new ApiError(401, "Invalid  password");
    }

    // Generate JWT token
    const token = generateToken(user);

    res.status(200).json(new ApiResponse(200, { token }, "User logged in successfully"));
  } catch (error) {
    next(error);
  }
}
