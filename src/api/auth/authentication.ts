import express, { Request, Response } from "express";
export const auth = express.Router();

auth.post("/login", (req: Request, res: Response) => {
	res.send({ msg: "login route working" });
});

auth.post("/register", (req: Request, res: Response) => {
	res.send({ msg: "register route working" });
});
