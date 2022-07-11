
import { CustomErrors } from "./custom-errors";

export class NotFoundError extends CustomErrors {
    statusCode = 404
    reason = 'Route not found'

    constructor(){
        super('Error connecting to database');
        //Just because we are extending a built in class (Error)
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }   

    serializeErrors(){
        return [
            {message: this.reason}
        ]
    }


}
