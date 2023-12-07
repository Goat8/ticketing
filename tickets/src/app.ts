import express from "express";
import "express-async-errors";
import {json} from "body-parser";
// import { currentuserRouter} from "./routes/current-user";
// import {signInRouter }from "./routes/signin"
// import {signOutRouter } from "./routes/signout"
// import {signUpRouter } from "./routes/signup"
import { currentUser, errorHandler ,NotFoundError} from   "@mariarafique/common";
import CookieSession from "cookie-session"
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
//import {createTicketRouter} from 
const app = express();  
app.set('trust proxy', true) //due to proxy nginx server. proxy through nginx
app.use(json());
app.use(CookieSession({
    signed:false,
    secure:process.env.NODE_ENV !== 'test'//true
}))
app.use(currentUser)
app.use(createTicketRouter)
app.use(showTicketRouter)

// app.use(signInRouter)
// app.use(signOutRouter)
// app.use(signUpRouter)
// app.all("*",async (req, resp, next)=>{ //IF ADD asyn()=>{}; wont resolve value immediatly
//     next(new NotFoundError())
// })
app.all("*", async ()=>{
   throw new NotFoundError()
})
app.use(errorHandler)


export {app}