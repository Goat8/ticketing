import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose  from "mongoose";
import { beforeAll,beforeEach,  afterAll} from "@jest/globals"
//import request from "supertest";
//import {app} from "../app"
// declare global {
//     namespace NodeJS {
//         interface Global  {
//             signUp():Promise<string[]>
//         }
//     }
// }

let mongo:any

beforeAll(async ()=>{
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

// /**
//  * signUp response 
//  * @returns 
//  */
// global.signUp = async ()=>{
//     const response = await request(app)
//     .post("/api/users/signUp")
//     .send({
//         email:"mariatest@nxb.com",
//         password:"123456"
//     }).expect(201);
//    const cookie = response.get('Set-Cookie');
//    return cookie
// }