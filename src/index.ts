import express, { Request, Response } from 'express';
import db from './db';
import errorHanddlerMiddleware from './middlewares/error-handler.middleware';
import jwtAuthenticationMiddleware from './middlewares/jwt-authentication.middleware';
import authenticationRoute from './routes/authorization.route';
import userRoute from './routes/users.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/authentication', authenticationRoute);
app.use('/users', jwtAuthenticationMiddleware, userRoute);

app.use(errorHanddlerMiddleware);

app.use('/', (req: Request, res: Response) => {
    res.json({ message: 'ok' });
});

const server = app.listen(3000, () => {
    console.log('listem on 3000!');
});

process.on('SIGTERM', () => {
    db.end(() => {
        console.log('database connection closed!')
    });
    server.close(() => {
        console.log('server on 3000 closed!');
    });
})