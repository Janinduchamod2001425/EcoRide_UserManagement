import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// @desc Auth user/set toekn
// route POST/api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      conatct: user.conatct,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }

  //res.status(200).json({ message : 'Auth User' });
});

// @desc Register new user
// route POST/api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, contact, password, role } = req.body;

  const userExists = await User.findOne({ email });

  // Validate required fields
  if (!name || !email || !contact || !password || !role) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Validate email format
  const emailAddress = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailAddress.test(email)) {
    res.status(400);
    throw new Error("Invalid email format");
  }

  // Validate password
  if (password.length <= 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters long");
  }

  // Validate if the user already registered
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    contact,
    password,
    role,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      contact: user.contact,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  //res.status(200).json({ message : 'Register User' });
});

// @desc Logout user
// route POST/api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User Logged Out" });
});

// @desc Get user profile
// route GET/api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    contact: req.user.contact,
    role: req.user.role,
  };

  res.status(200).json(user);
});

// @desc Update user profile
// route PUT/api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.contact = req.body.contact || user.contact;
    user.role = req.body.role || user.role;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      contact: updatedUser.contact,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }

  //res.status(200).json({ message : 'Update User Profile' });
});

//---------  CRUD (Admin Dashboard) ------------

// @desc Create user Profile by admin
// @route DELETE /api/users/create/:id
// @access Private/Admin
const createUserProfile = asyncHandler(async (req, res) => {
  try {
    const newuser = new User(req.body);

    if (!newuser) {
      return res.status(404).json({ message: "User not found" });
    }

    const saveUser = await newuser.save();
    res.status(200).json(saveUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc Update user Profile by admin
// @route PUT /api/users/update/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {}
});

// @desc Delete user Profile
// @route DELETE /api/users/delete/:id
// @access Private/Admin
const deleteUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    const id = req.params.id;
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Get one User
// @ route GET /api/users/:id
// @access public
const getUser = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(userExists);
  } catch (error) {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Get All Users
// @route GET /api/users
// @access Private/Admin
const getAllUsersProfiles = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  createUserProfile,
  updateUser,
  deleteUserProfile,
  getAllUsersProfiles,
  getUser,
};
