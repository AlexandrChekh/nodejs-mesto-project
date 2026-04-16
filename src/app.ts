import 'dotenv/config';
import express, { NextFunction } from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import { createUser, login } from './controllers/users';
import NotFoundError from './errors/not-found-error';
import auth from './middlewares/auth';
import errorHandler from './middlewares/error-handler';
import cardsRouter from './routes/cards';
import usersRouter from './routes/users';
import {
  validateAuthorizationHeader,
  validateLoginBody,
  validateSignupBody
} from './middlewares/validators';
import { ROUTE_NOT_FOUND_MESSAGE } from './utils/constants';
import { mongoUrl } from './utils/config';
import { requestLogger, errorLogger } from './middlewares/logger';

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(mongoUrl);

app.use(requestLogger);

app.post('/signin', validateLoginBody, login);
app.post('/signup', validateSignupBody, createUser);
app.use(validateAuthorizationHeader);
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errorLogger);

app.use((req, res, next: NextFunction) => {
  next(new NotFoundError(ROUTE_NOT_FOUND_MESSAGE));
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(BASE_PATH);
  console.log(`Server is running on port ${PORT}`);
});
