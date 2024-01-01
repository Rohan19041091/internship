import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: String,
    phone: String,
    name: String,
    profileImage: String,
    password: String,
    role: String,
  });
  const User = mongoose.model('User', userSchema);  

export default User