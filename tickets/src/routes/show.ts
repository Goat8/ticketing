import express, {Request, Response} from "express";
import { BadRequestError,NotFoundError,currentUser,requrieAuth } from "@mariarafique/common";
import { Ticket } from "../models/ticket";
const router = express.Router()


router.get("/api/tickets/:id",currentUser, requrieAuth,
 async (req:Request, res:Response)=>{
    const {id} = req.params;
    const ticket = await Ticket.findById(id);
    if(!ticket) throw new NotFoundError()

    res.status(200).send(ticket)
})

export {router as showTicketRouter}