import { CustomErrors } from "./custom-errors";

export class BadRequestError extends CustomErrors {
    statusCode = 400;

    constructor(public message: string){
        super(message);

        Object.setPrototypeOf(this, BadRequestError.prototype)
    }

    serializeErrors() { 
        return [{ message: this.message }] 
    }
    
}