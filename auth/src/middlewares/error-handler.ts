import {Request, Response, NextFunction} from "express";
import {RequestValidationError} from "../errors/request-validation-error";
import {DatabaseConnectionError} from "../errors/database-connection-error"
import { FieldValidationError } from "express-validator";
export const errorHandler = (err:Error, req:Request, res:Response, next:NextFunction)=>{
    if(err instanceof RequestValidationError) {
        console.log("Handling request validation error!");
        return res.status(err.statusCode).send({errors:err.serializeErrors()})
    }
    if(err instanceof DatabaseConnectionError) {
        return res.status(err.statusCode).send({errors:[{message: err.serializeErrors()}]})
    }

    res.status(400).send({
       errors: [{ message: err.message}] 
    })
}