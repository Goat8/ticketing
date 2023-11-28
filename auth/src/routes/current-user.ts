import express from "express";
import { currentUser } from "../middlewares/current-user";
import { requrieAuth } from "../middlewares/require-auth";

const router = express.Router()
router.get("/api/users/currentuser", currentUser,requrieAuth, (req, res)=>{
    res.send({currentUser:req.currentUser});
})

export {router as currentuserRouter}
