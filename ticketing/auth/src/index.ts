import express from 'express'
import { json } from "body-parser";
import "express-async-errors";
import mongoose from "mongoose";

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(json()) 

app.use(currentUserRouter)
app.use(signInRouter)
app.use(signupRouter)
app.use(signoutRouter)

app.all('*', async ()=>{
    throw new NotFoundError()
})

app.use(errorHandler)

const startMongo = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    } catch (error) {
        console.error(error)
    }
    console.log("Connected to MongoDB")
}

app.listen(3000, ()=>{
    console.log('Listening on port 3000!!!')
})

startMongo()