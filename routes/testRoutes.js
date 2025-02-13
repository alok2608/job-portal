import express from 'express';
import { testPostControllers } from '../controllers/testController.js';
import userAuth from '../middlewares/authmiddleware.js';
const router=express.Router();

router.post('/test-post',userAuth,testPostControllers)


export default router;