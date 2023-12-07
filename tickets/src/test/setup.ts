import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose  from "mongoose";
import { beforeAll,beforeEach,  afterAll} from "@jest/globals";
import jwt from 'jsonwebtoken'
// declare global {
//     namespace NodeJS {
//         interface Global  {
//             signUp?():string[] 
//         }
//     }
// }
let mongo:any

beforeAll(async ()=>{
    process.env.JWT_KEY="asdfasdf"
    process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();
    await mongoose.connect(mongoUri)
});
beforeEach(async ()=>{
    const collections = await mongoose.connection.db.collections();
    for(let collection of collections){
        await collection.deleteMany({})
    }
});
afterAll(async ()=>{
    await mongo.stop();
    await mongoose.connection.close();
});
// interface GlobalWithSignUp extends NodeJS.Global {
//     [key: string]: any;
// }
// global.signUp = function (){
//     const payload ={
//         id:"12323232",
//         email:"test@test.com"
//     }
//    if(!process.env.JWT_KEY) return;
//    const token = jwt.sign(payload, process.env.JWT_KEY);
//    const sessionJSON =JSON.stringify({jwt:token})
//    const base64 = Buffer.from(sessionJSON).toString('base64')
   
//    return [`express:sess=${base64}`]
// }