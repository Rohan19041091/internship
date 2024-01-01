import  jwt  from "jsonwebtoken";
import { secretKey } from "../utils/constant.js";

const authUserMiddleWare=(req,res,next)=>{
    const token=req.header('Authorization')
    if(!token){
        return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), secretKey);
       
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message);
        res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
}



export default authUserMiddleWare