import { Request, Response, NextFunction } from "express";
import { CustomErrors } from "../errors/custom-errors";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction)=>{
    if (err instanceof CustomErrors){
    //    const formattedErrors = err.errors.map(error => ({message: error.msg, field: error.param}))
       return res.status(err.statusCode).send({ errors: err.serializeErrors() })
    }

    res.status(500).send({
        errors: [{message: "Something went wrong"}]
    })
}

