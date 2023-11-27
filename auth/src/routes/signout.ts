import express from "express";
const router = express.Router()


router.post("/api/users/singOut", (req, res)=>{
    res.send("HI");
})

export {router as signOutRouter}