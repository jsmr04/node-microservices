import { ValidationError } from "express-validator";
import { CustomErrors } from "./custom-errors";

export class RequestValidationError extends CustomErrors {
    statusCode = 400

    constructor(public errors: ValidationError[]){
        super('Error in parameter');
        //Just because we are extending a built in class (Error)
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }   

    serializeErrors(){
        return this.errors.map(error => ({message: error.msg, field: error.param}))
    }
}

