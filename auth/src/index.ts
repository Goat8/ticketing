import  mongoose  from "mongoose";
import {app} from './app'
const start = async ()=>{

    if(!process.env.JWT_KEY){
        throw new Error("Secrete key missing");
    }
    console.log("brrrrrrrrrrrrew",process.env.MONGO_URI);
    if(!process.env.MONGO_URI){
        throw new Error("Mongo URI must be defined");
    }
    try{
        await mongoose.connect(process.env.MONGO_URI) //mongodb://auth-mongo-srv:27017/auth
        console.log("Connected to database successfuly.")
    }
    catch(err) {
        console.log("EORRRRRRRRRR", err)
    }
    console.log("!!Starting server....")

    app.listen(3000, async ()=>{
        console.log("Auth service listening on port 3000!!!");
    });
}

start()



