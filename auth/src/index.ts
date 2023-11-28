import express from "express";
import "express-async-errors";
import {json} from "body-parser";
import { currentuserRouter} from "./routes/current-user";
import {signInRouter }from "./routes/signin"
import {signOutRouter } from "./routes/signout"
import {signUpRouter } from "./routes/signup"
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import  mongoose  from "mongoose";
import CookieSession from "cookie-session"
const app = express();
app.set('trust proxy', true) //due to proxy nginx server. proxy through nginx
app.use(json());
app.use(CookieSession({
    signed:false,
    secure:true
}))
app.use(currentuserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)
// app.all("*",async (req, resp, next)=>{ //IF ADD asyn()=>{}; wont resolve value immediatly
//     next(new NotFoundError())
// })
app.all("*", async ()=>{
   throw new NotFoundError()
})
app.use(errorHandler)
const start = async ()=>{
    
    if(!process.env.JWT_KEY){
        throw new Error("Secrete key missing");
    }
    try{
        await mongoose.connect("mongodb://auth-mongo-srv:27017/auth")
        console.log("Connected to database successfuly.")
    }
    catch(err) {
        console.log("EORRRRRRRRRR", err)
    }
}
app.listen(3000, async ()=>{
    console.log("Auth service listening on port 3000!!!");
});
start()


