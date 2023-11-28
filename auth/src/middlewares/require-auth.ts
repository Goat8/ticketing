import {Request, Response, NextFunction} from "express";
import { CustomError } from "../errors/custom-error";
import { currentUser } from "./current-user";
import { NotAuthorizedError } from "../errors/not-athorized-error";

export const requrieAuth = (req:Request, res:Response, next:NextFunction)=>{
    if(!req.currentUser){
        throw new NotAuthorizedError()
    }
    next()

}