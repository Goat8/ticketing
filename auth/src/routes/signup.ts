import express, {Request, Response} from "express";
import {body} from "express-validator"
import { User } from "../models/user";
import { BadRequestError,validateRequest } from "@mariarafique/common";
import jwt from "jsonwebtoken"
const router = express.Router()

router.post("/api/users/signUp", 
[body('email').isEmail().withMessage("Email must be valid."), 
body("password").trim().isLength({min:4, max:20}).withMessage("Password must be between 4 and 20 characters.")], 
validateRequest,

async(req:Request, res:Response)=>{   

    const {email, password} = req.body;

    const existingUser = await User.findOne({email});
    if(existingUser){
       throw new BadRequestError("Email already in use.")
    }

    //hash password optionally
    const user =  User.build({
        email,
        password
    })

    await user.save()

  

    //send jwt token
    const jwtToken =jwt.sign({ //it converted it into base64 encoded
        email,
        id:user.id
        }, process.env.JWT_KEY!)

    req.session = {jwt:jwtToken};

    res.status(201).send(user);
})

export {router as signUpRouter}