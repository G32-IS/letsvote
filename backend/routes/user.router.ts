import express, {Request, Response} from 'express'

export const userRouter = express.Router();

userRouter.use(express.json());

userRouter.post('/request', async (req: Request, res: Response) => {
})