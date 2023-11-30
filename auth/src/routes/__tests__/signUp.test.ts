import request from "supertest";
import {app} from "../../app"
import { it,expect } from "@jest/globals"

it("should returns 201 on succesful signUP", async ()=>{
    return request(app)
            .post("/api/users/signUp")
            .send({
                email:"maria@nxb.com",
                password:"123456"
            }).expect(201)
})

it("should returns 400 with invalid email", async ()=>{
    return request(app)
            .post("/api/users/signUp")
            .send({
                email:"maria",
                password:"123456"
            }).expect(400)
})


it("should returns 400 with invalid passowrd", async ()=>{
    return request(app)
            .post("/api/users/signUp")
            .send({
                email:"maria",
                password:"1"
            }).expect(400)
})

it("should returns 400 with missing passowrd and missing email", async ()=>{
    await request(app)
            .post("/api/users/signUp")
            .send({
                email:"maria",
            }).expect(400);

    await request(app)
            .post("/api/users/signUp")
            .send({
                password:"1"
            }).expect(400)
})

it("should not allow duplicate email", async ()=>{
    await request(app)
            .post("/api/users/signUp")
            .send({
                email:"maria45@nxb.com.pk",
                password:"123456"
            }).expect(201)
            let response = "";
        
    await request(app)
            .post("/api/users/signUp")
            .send({
                email:"maria45@nxb.com.pk",
                password:"123456"
            }).expect(400)
})
it("should set a cookie after succesful signUp", async ()=>{
    const response = await request(app)
            .post("/api/users/signUp")
            .send({
                email:"maria4557@nxb.com.pk",
                password:"123456"
            }).expect(201);
    
    expect(response.get("Set-Cookie")).toBeDefined()
})
