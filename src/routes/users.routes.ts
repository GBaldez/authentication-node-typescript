import {Request, Response, NextFunction, Router} from 'express';
import { StatusCodes } from 'http-status-codes';
import userRepository from '../repositories/user.repository';

const usersRoute = Router();

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();
    res.status(200).send(users);
});

usersRoute.get('/user/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const user = req.params.uuid;
    const foundUser = await userRepository.findById(user);
    res.status(StatusCodes.OK).send({ foundUser });
});

usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    const user = await userRepository.create(newUser);
    res.status(StatusCodes.CREATED).send(user);
});

usersRoute.put('/user/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const user = req.params.uuid;
    const modifiedUser = req.body;
    modifiedUser.uuid = user;

    await userRepository.update(modifiedUser);
    res.status(StatusCodes.OK).send();
});

usersRoute.delete('/user/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    await userRepository.remove(uuid);
    res.status(StatusCodes.OK);
});

export default usersRoute;