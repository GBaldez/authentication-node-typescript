import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from 'http-status-codes';
import { User } from '../models/user.models';
import userRepository from '../repositories/user.repository';

const userRoute = Router();

userRoute.get('/', async (req: Request, res: Response) => {
    
    const users = await userRepository.findAllUsers();
    res.status(StatusCodes.OK).send(users);
});

userRoute.get('/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid;
        const user: User | null = await userRepository.findByUuid(uuid);

        if (!user) {
            return res.sendStatus(StatusCodes.NO_CONTENT);
        }

        return res.status(StatusCodes.OK).json(user);
    } catch (error) {
        return next(error);
    }
});

userRoute.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: User = req.body;
        const uuid = await userRepository.create(user);
        return res.status(StatusCodes.CREATED).json({ uuid });
    } catch (error) {
        return next(error);
    }
});

userRoute.put('/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid;
        const user: User = req.body;
        user.uuid = uuid;
        const updatedUser = await userRepository.update(user);
        return res.status(StatusCodes.OK).json(updatedUser);
    } catch (error) {
        return next(error);
    }
});

userRoute.delete('/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid;
        await userRepository.remove(uuid);
        return res.sendStatus(StatusCodes.OK);
    } catch (error) {
        return next(error);
    }
});

export default userRoute;