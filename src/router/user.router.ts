import { Router } from "express";
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler';
import { User, UserModel } from "../model/user.model";
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

   router.post("/login", asyncHandler(
    async (req, res) => {
      const {email, password} = req.body;
      const user = await UserModel.findOne({email , password});
  
       if(user) {
        res.send(generateTokenReponse(user));
       }
       else{
         const BAD_REQUEST = 400;
         res.status(BAD_REQUEST).send("Username or password is invalid!");
       }
  
    }
  ))

  router.post('/register', asyncHandler(
    async (req, res) => {
      const {username, email, password} = req.body;
      const user = await UserModel.findOne({email});
      if(user){
        res.status(400)
        .send('User is already exist, please login!');
        return;
      }
  
      const encryptedPassword = await bcrypt.hash(password, 10);
  
      const newUser:User = {
        id:'',
        username,
        email: email.toLowerCase(),
        password: encryptedPassword,
        isAdmin: false
        
      }
  
      const dbUser = await UserModel.create(newUser);
      res.send(generateTokenReponse(dbUser));
      res.send("User registered");

    }
  ))

  const generateTokenReponse = (user : User) => {
    const token = jwt.sign({
      email:user.email, isAdmin: user.isAdmin
    },process.env.SECRET_KEY!,{
      expiresIn:"30d"
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token
    };
  }

  export default router;