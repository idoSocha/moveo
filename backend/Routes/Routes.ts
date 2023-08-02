import express, { NextFunction, Request, Response } from "express";
import Logic from "../Logic/Logic";

//creating the router
const router = express.Router();

//get all the code blocks
router.get(
  "/list",
  async (request: Request, response: Response, next: NextFunction) => {
    const result = await Logic.getAllCodes();
    response.status(200).json(result);
  }
);

//getting a code block by id
router.get(
  "/list/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    const code = request.body;
    const result = await Logic.getCodeByCodeId(id);
    response.status(200).json(result);
  }
);

export default router;
