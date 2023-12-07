import request from "supertest";
import {app }from "../../app";
import { expect, it } from "@jest/globals"
import {Ticket} from "../../models/ticket"
import jwt from 'jsonwebtoken'

// export const authenticate = function(){
//     const payload ={
//         id:"12323232",
//         email:"test@test.com"
//     }
//    // console.log("coooooo", process.env.JWT_KEY);
//    // if(!process.env.JWT_KEY) return;
//     const token = jwt.sign(payload, "asdfasdf");
//     const sessionJSON =JSON.stringify({jwt:token})
//     const base64 = Buffer.from(sessionJSON).toString('base64');
//     return base64//[`${base64}`]//express:sess=

// }


// it('it has route handler tickets /api/tickers for post request', async()=>{
//     const response = await request(app)
//     .post("/api/tickets")
//     .send({})
//     expect(response.status).not.toEqual(404)
// })  
// it('it can only be accessed if user is signed in', async()=>{
//     const response = await request(app)
//     .post("/api/tickets")
//     .send({})
//     expect(response.status).toEqual(401)
// })
// it('it returns status other than 401 if use is signed in', async()=>{
//     const cookie= authenticate();
//     console.log("cookie", cookie);
//     const response = await request(app)
    
//     .post("/api/tickets")
//     .set('Cookie',cookie as string)
//     .send({})
//     expect(response.status).not.toEqual(401)
// })
// it('it an error if invalid title is provided', async()=>{
//     const cookie= authenticate();
//     console.log("cookie", cookie);
//     const response = await request(app)
    
//     .post("/api/tickets")
//     .set('Cookie',cookie as string)
//     .send({title:"", price:10})
//     expect(response.status).toEqual(400)
// })
// it('it returns an error if invalid price us provided', async()=>{

// })
it('it creates a ticket with valid inputs', async()=>{
    //add check to make sure a ticket was saved.
    let tickets = await Ticket.find({});
   console.log("oooooooooooooooooo", tickets);

    // expect(tickets.length).toEqual(0);
    const response = await request(app)
    .post("/api/tickets")
    .send({title:"soeksfddddddddd", price:220})
    expect(response.status).toEqual(201);

    // tickets = await Ticket.find({});
    // expect(tickets.length).toEqual(1);

},10000)