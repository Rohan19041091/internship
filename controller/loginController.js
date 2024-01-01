
import User from '../models/userModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendResponse,sendErrorResponse } from '../utils/helper.js';
import { secretKey } from '../utils/constant.js';
const userLogin=async(req,res)=>{
    const{email,password}=req.body;
    const user = await User.findOne({email});
    if(!user){
      sendErrorResponse(res, 400, 'user not found');
    }
    
    const userPasswordMatch =  bcrypt.compare(password,user.password)
    if(userPasswordMatch){
       const UserToken = jwt.sign({email:user.email,userId:user._id},secretKey, { expiresIn: '1h' })
       sendResponse(res, "User token ", {UserToken});
    }
    else{
      sendErrorResponse(res, 400, 'incorrect password');
    }
  
  }

const adminLogin=async(req,res)=>{
  const{email,password}=req.body;
  const user = await User.findOne({email});
  if(!user){
    sendErrorResponse(res, 400, 'user not found');
  }
  
  const userPasswordMatch =  bcrypt.compare(password,user.password)
  if(userPasswordMatch){
     const UserToken = jwt.sign({email:user.email,userId:user._id,role:user.role},secretKey, { expiresIn: '1h' })
     sendResponse(res, "User token ", {UserToken});
  }
  else{
    sendErrorResponse(res, 400, 'incorrect password');
  }

}
export {userLogin,adminLogin}