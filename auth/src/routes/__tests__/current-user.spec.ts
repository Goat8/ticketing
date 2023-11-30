import request from "supertest";
import {app} from "../../app"
import { it } from "@jest/globals"

it("should returns details about current user,", async ()=>{
   const signUpResponse = await request(app)
            .post("/api/users/signUp")
            .send({
                email:"mariatest@nxb.com",
                password:"123456"
            }).expect(201);
    const cookie = signUpResponse.get('Set-Cookie')
            const resp =await request(app)
            .post("/api/users/currentuser")
            .set("Cookie", cookie)
            .send({
                email:"mariatest@nxb.com",
                password:"123456"
            }).expect(200);

        console.log("response", resp);
})