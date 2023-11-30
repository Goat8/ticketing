import request from "supertest";
import {app} from "../../app"
import { it,expect } from "@jest/globals"
//const { beforeAll, afterAll, it,expect } = require('@jest/globals');

it("should returns fail when email does not exist,", async ()=>{
    return request(app)
            .post("/api/users/signIn")
            .send({
                email:"mariatest@nxb.com",
                password:"123456"
            }).expect(400)
})

it("should returns fail when incorrect password is applied,", async ()=>{
    await request(app)
            .post("/api/users/signIn")
            .send({
                email:"mariatest@nxb.com",
                password:"123456"
            }).expect(201);

    const response = await request(app)
            .post("/api/users/signIn")
            .send({
                email:"mariatest@nxb.com",
                password:"1"
            }).expect(400);
    
    expect(response.get("Set-Cookie")).toBeDefined()

})


