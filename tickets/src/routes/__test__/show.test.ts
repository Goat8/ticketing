import request from "supertest";
import {app }from "../../app";
import { expect, it } from "@jest/globals"
import {Ticket} from "../../models/ticket"
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
const id = new mongoose.Types.ObjectId().toHexString()

export const authenticate = function(){
    const id = new mongoose.Types.ObjectId().toHexString()
    const payload ={
        //id:"092349320943",
        id,
        email:"test@test.com"
    }
   // console.log("coooooo", process.env.JWT_KEY);
   // if(!process.env.JWT_KEY) return;
    const token = jwt.sign(payload, "asdfasdf");
    const sessionJSON =JSON.stringify({jwt:token})
    const base64 = Buffer.from(sessionJSON).toString('base64');
    return base64//[`${base64}`]//express:sess=

}



it('should return 404 if ticket is not found ', async()=>{
    const response = await request(app)
    .get("/api/tickets/abcevgddfs")
    .send({})
    expect(response.status).toEqual(404)
})  


it('should return ticket if ticket is found ', async()=>{
    const title= "test";
    const price = 20;

   const createdTicketResponse = await request(app)
    .post("/api/tickets")
    .set("Cookie",authenticate() )
    .send({title, price})

    console.log("virrrrrrrrrr",createdTicketResponse);
    const response = await request(app)
    .get(`/api/tickets/abcevgddfs/${createdTicketResponse.body.id}`)
    .send({})
    expect(response.body.title).toEqual(title)
    expect(response.body.price).toEqual(price)
})  