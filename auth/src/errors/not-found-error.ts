import { CustomError } from "./custom-error";
export class NotFoundError extends CustomError{
    public statusCode=404;
    public constructor(){
        super('')
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }
    public serializeErrors(): { message: string; field?: string | undefined; }[] {
       return [{message: "Not found"}]
    }

}