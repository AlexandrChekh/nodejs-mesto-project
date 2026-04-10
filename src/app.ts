import express, { NextFunction, Response } from 'express';
import mongoose from 'mongoose';
import errorHandler from './middlewares/error-handler';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import NotFoundError from './errors/not-found-error';
import { SessionRequest } from './types/request';
import { ROUTE_NOT_FOUND_MESSAGE } from './utils/constants';

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req: SessionRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '69d795c8989735cae901a2b0'
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res, next: NextFunction) => {
  next(new NotFoundError(ROUTE_NOT_FOUND_MESSAGE));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(BASE_PATH);
  console.log(`Server is running on port ${PORT}`);
});
