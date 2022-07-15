import { CustomErrors } from "./custom-errors";

export class NotAutorizedError extends CustomErrors {
    statusCode = 401;

    constructor(){
        super('Not Authorized')

        Object.setPrototypeOf(this, NotAutorizedError.prototype)
    }

    serializeErrors = ()=> {
        return [{ message: 'Not Authorized' }]
    }
}