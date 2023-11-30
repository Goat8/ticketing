import  mongoose  from "mongoose";
import {app} from './app'
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
    app.listen(3000, async ()=>{
        console.log("Auth service listening on port 3000!!!");
    });
}

start()



