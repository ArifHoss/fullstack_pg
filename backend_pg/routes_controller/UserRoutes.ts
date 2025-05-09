import {Request, Response, Router} from "express";
import User from "../models/User";

const router = Router();

// GET ALL user
router.get('/', async (request: Request, response: Response) => {
    const users = await User.findAll();
    response.json(users);
})

export default router;