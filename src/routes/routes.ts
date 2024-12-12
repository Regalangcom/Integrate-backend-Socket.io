import express , { Request , Response } from "express";
import { LoginUser, RegisterUser, sendMessage } from "../controllers/user-control";


const RouterApp = express.Router()




RouterApp.post("/RegisterUser", async (req: Request, res: Response) => {
    try {
       await RegisterUser(req , res)
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

RouterApp.post("/LoginUser", async (req: Request, res: Response) => {
    try {
       await LoginUser(req , res)
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

RouterApp.post("/send" , async (req: Request, res: Response) => {
    try {
        await sendMessage(req, res)
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
})

export default RouterApp