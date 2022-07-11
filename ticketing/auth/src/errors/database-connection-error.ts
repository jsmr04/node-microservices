
import { CustomErrors } from "./custom-errors";

export class DatabaseConnectionError extends CustomErrors {
    statusCode = 500
    reason = 'Error connecting to database'

    constructor(){
        super('Error connecting to database');
        //Just because we are extending a built in class (Error)
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }   

    serializeErrors(){
        return [
            {message: this.reason}
        ]
    }


}

