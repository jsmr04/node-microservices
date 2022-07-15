import express from 'express'
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();

app.set('trust proxy', true)
app.use(json()) 
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
)

app.use(currentUserRouter)
app.use(signInRouter)
app.use(signupRouter)
app.use(signoutRouter)

app.all('*', async ()=>{
    throw new NotFoundError()
})

app.use(errorHandler)

export { app }