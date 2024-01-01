import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import {sendResponse,sendErrorResponse} from "../utils/helper.js";
const createUser=async(req,res)=>{
     const {name,email,password,phoneNo,profilePic}=req.body
     const hashedPassword = await bcrypt.hash(password,10)
     const newUser= await new User({name,email,password:hashedPassword,phoneNo,profilePic})
     try {
        await  newUser.save();
        sendResponse(res, "User created", newUser);
      } catch (error) {
        sendErrorResponse(res, 500, 'Error creating user');
      }
}

const updateUser=async(req,res)=>{
  try {
  const { name, profileImage } = req.body;

  
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, { name, profileImage }, { new: true });
  
  res.json(updatedUser);
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal Server Error' });
}
};

const deleteUser = async (req, res) => {
  try {

    await User.findByIdAndDelete(req.user.userId);

    res.json({ message: 'User deleted successfully' ,});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const getUserDetails = async (req, res) => {
  try {

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createAdmin= async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await User.findOne({ email, role: 'admin' });
    if (existingAdmin) {
      return res.status(409).json({ message: 'Admin already exists' });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const admin = new User({ email, password: hashedPassword, role: 'admin' });
    await admin.save();

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const listOfAllUser= async (req, res) => {
  try {
   
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const users = await User.find();

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const updateUserDataByAdmin=async (req, res) => {
  try {
    // Ensure the requester is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const updatedFields = req.body
    const userId =req.body;

    // Update user details
    const updatedUser = await User.findByIdAndUpdate(userId, {updatedFields }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
const deleteByAdmin=async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
export {createUser,updateUser,updateUserDataByAdmin,deleteUser,getUserDetails,createAdmin,deleteByAdmin,listOfAllUser}