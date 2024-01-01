import express from 'express';
import authUserMiddleWare from '../midleware/userAuthMiddleware.js';
import { createAdmin, createUser, deleteByAdmin, deleteUser, getUserDetails, listOfAllUser, updateUser, updateUserDataByAdmin } from '../controller/userController.js';
import authAdminMiddleWare from '../midleware/adminAuthMiddleware.js';
import { adminLogin, userLogin } from '../controller/loginController.js';
const router = express.Router();

router.post('/createUser',createUser)
router.put('/updatetUser',authUserMiddleWare,updateUser)
router.delete('/deleteUser',authUserMiddleWare,deleteUser)
router.get('/getUserDetails',authUserMiddleWare,getUserDetails)

router.post('/createAdmin',createAdmin)
router.get('/getListOfAlluser',authAdminMiddleWare,listOfAllUser)
router.put('/updateUserDataByAdmin',authAdminMiddleWare,updateUserDataByAdmin)
router.delete('/deleteByAdmin',authAdminMiddleWare,deleteByAdmin)

router.post('/loginUser',userLogin)
router.post('/loginAdmin',adminLogin)
export default router;