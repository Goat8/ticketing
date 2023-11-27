import { ValidationError } from "express-validator";
export class RequestValidationError extends Error {
    statusCode=400;

    constructor(public errors: ValidationError[]) {
        super()

        //built in class

        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    /**
     * 
     * @returns 
     */
    serializeErrors(){
        return this.errors.map((error:any)=>{
            return {message:error.msg, field:error.path}
        })
    }
}

