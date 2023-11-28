import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
    public statusCode =401;
    public constructor(){
        super('Not Authorized')
        Object.setPrototypeOf(this, NotAuthorizedError.prototype)
    }
    public serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{message: "Not Authorized"}]
    }
    
}