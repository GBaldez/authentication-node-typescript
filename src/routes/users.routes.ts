import {Request, Response, NextFunction, Router} from 'express';
import { StatusCodes } from 'http-status-codes';
import userRepository from '../repositories/user.repository';

const usersRoute = Router();

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();
    res.status(200).send(users);
});

usersRoute.get('/user/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const user = req.params.uuid;
    res.status(StatusCodes.OK).send({ user });
});

usersRoute.post('/users',(req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    res.status(StatusCodes.CREATED).send(newUser);
});

usersRoute.put('/user/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const user = req.params.uuid;
    const modifiedUser = req.body;
    modifiedUser.uuid = user;
    res.status(StatusCodes.OK).send(modifiedUser);
});

usersRoute.delete('/user/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK);
});

export default usersRoute;