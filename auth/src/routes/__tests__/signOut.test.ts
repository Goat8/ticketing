import request from "supertest";
import {app} from "../../app"
import { it } from "@jest/globals"

it("should clear the cookie after signout", async ()=>{
    await request(app)
            .post("/api/users/signOut")
            .send({
                email:"mariatest@nxb.com",
                password:"123456"
            }).expect(201);
    const response = await request(app)
    .post("/api/users/signOut")
    .send({
    }).expect(200);

})



