import express from 'express';
import { login, signup } from '../controllers/authController.js';

const router = express.Router();

router.get("/",(req,res)=>{
    res.send("auth services running")
})
router.post('/signup', signup);
router.post('/login', login);

export default router;
