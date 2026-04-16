import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';
import NotFoundError from '../errors/not-found-error';
import User from '../models/user';
import { SessionRequest } from '../types/request';

import {
  DUPLICATE_USER_EMAIL_MESSAGE,
  INVALID_USER_AVATAR_DATA_MESSAGE,
  INVALID_USER_CREATE_DATA_MESSAGE,
  INVALID_USER_UPDATE_DATA_MESSAGE,
  USER_BY_ID_NOT_FOUND_MESSAGE,
  USER_NOT_FOUND_MESSAGE
} from '../utils/constants';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  return User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  return User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_BY_ID_NOT_FOUND_MESSAGE);
      }

      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new NotFoundError(USER_BY_ID_NOT_FOUND_MESSAGE));
      }

      return next(err);
    });
};

export const getCurrentUser = (
  req: SessionRequest,
  res: Response,
  next: NextFunction
) => {
  return User.findById(req.user?._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
      }
      res.send({ data: user });
    })
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name = 'Жак-Ив Кусто',
    about = 'Исследователь',
    avatar = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    email,
    password
  } = req.body;

  return bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        about,
        avatar,
        email,
        password: hash
      });
    })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(INVALID_USER_CREATE_DATA_MESSAGE));
      }

      if (err.code === 11000) {
        return next(new ConflictError(DUPLICATE_USER_EMAIL_MESSAGE));
      }

      return next(err);
    });
};

export const updateUser = (
  req: SessionRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, about } = req.body;
  const id = req.user?._id;

  return User.findByIdAndUpdate(
    id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
      }

      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(INVALID_USER_UPDATE_DATA_MESSAGE));
      }

      return next(err);
    });
};

export const updateUserAvatar = (
  req: SessionRequest,
  res: Response,
  next: NextFunction
) => {
  const { avatar } = req.body;
  const id = req.user?._id;

  return User.findByIdAndUpdate(
    id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
      }

      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(INVALID_USER_AVATAR_DATA_MESSAGE));
      }

      return next(err);
    });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', {
        expiresIn: '7d'
      });
      res.send({ token });
    })
    .catch(next);
};
