import express, { NextFunction } from 'express';
import mongoose from 'mongoose';
import { createUser, login } from './controllers/users';
import NotFoundError from './errors/not-found-error';
import auth from './middlewares/auth';
import errorHandler from './middlewares/error-handler';
import cardsRouter from './routes/cards';
import usersRouter from './routes/users';
import { ROUTE_NOT_FOUND_MESSAGE } from './utils/constants';

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
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
