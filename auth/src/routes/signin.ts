import express, {Request, Response, NextFunction} from "express";
import {body} from "express-validator"
import { User } from "../models/user";
import { Password } from "../services/password";
import { validateRequest } from "../middlewares/validate-request";
import jwt from "jsonwebtoken";

import { BadRequestError } from "../errors/bad-request-error";
const router = express.Router()


router.post("/api/users/signIn",[body('email').isEmail().withMessage("Email must be valid."), 
body("password").trim().isLength({min:4, max:20}).withMessage("Password must be between 4 and 20 characters.")], validateRequest
, async (req:Request, res:Response)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw new BadRequestError("Invalid Email Login Credentials.");
    }   

    const isMatched = await Password.compare(user.password,password);
    if(!isMatched){
        throw new BadRequestError("Invalid Password Login Credentials.");
    }


    //send jwt token
    const jwtToken =jwt.sign({ //it converted it into base64 encoded
        email,
        id:user.id
        }, process.env.JWT_KEY!)

    req.session = {jwt:jwtToken};

    res.status(200).send(user);
})

export {router as signInRouter}