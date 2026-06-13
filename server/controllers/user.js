import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = process.env.JWT_SECRET || "test";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const oldUser = await UserModal.findOne({ email });
    if (!oldUser) return res.status(404).json({ message: "We couldn't find an account with that email." });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Incorrect email or password." });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong while signing in. Please try again." });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "Please fill in all the fields." });
    }
    if (confirmPassword !== undefined && password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match." });
    }

    const oldUser = await UserModal.findOne({ email });
    if (oldUser) return res.status(400).json({ message: "An account with that email already exists." });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

    res.status(201).json({ result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong while creating your account. Please try again." });
  }
};

export const forgotPassword = async (req, res) => {
  const { email, name, password, confirmPassword } = req.body;

  try {
    if (!email || !name || !password || !confirmPassword) {
      return res.status(400).json({ message: "Please fill in all the fields." });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match." });
    }

    const user = await UserModal.findOne({ email });
    console.log(user);
    if (!user || user.name.toLowerCase() !== name.trim().toLowerCase()) {
      return res.status(400).json({ message: "Email and name don't match our records." });
    }

    user.password = await bcrypt.hash(password, 12);
    await user.save();

    res.status(200).json({ message: "Password updated successfully. You can now sign in." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};
