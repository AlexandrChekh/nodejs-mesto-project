import { NextFunction, Request, Response } from 'express';

import BadRequestError from '../errors/bad-request-error';
import ForbiddenError from '../errors/forbidden-error';
import NotFoundError from '../errors/not-found-error';
import Card from '../models/card';
import { SessionRequest } from '../types/request';
import {
  CARD_NOT_FOUND_MESSAGE,
  FORBIDDEN_CARD_DELETE_MESSAGE,
  INVALID_CARD_CREATE_DATA_MESSAGE,
  INVALID_CARD_LIKE_DATA_MESSAGE
} from '../utils/constants';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  return Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

export const createCard = (
  req: SessionRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, link } = req.body;
  const id = req.user?._id;

  return Card.create({ name, link, owner: id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(INVALID_CARD_CREATE_DATA_MESSAGE));
      }

      return next(err);
    });
};

export const deleteCard = (
  req: SessionRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;

  return Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(CARD_NOT_FOUND_MESSAGE);
      }

      if (card.owner.toString() !== userId) {
        throw new ForbiddenError(FORBIDDEN_CARD_DELETE_MESSAGE);
      }

      return card.deleteOne().then(() => {
        res.send({ data: card });
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new NotFoundError(CARD_NOT_FOUND_MESSAGE));
      }

      return next(err);
    });
};

export const likeCard = (
  req: SessionRequest,
  res: Response,
  next: NextFunction
) => {
  const id = req.user?._id;
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(CARD_NOT_FOUND_MESSAGE);
      }

      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(INVALID_CARD_LIKE_DATA_MESSAGE));
      }

      return next(err);
    });
};

export const dislikeCard = (
  req: SessionRequest,
  res: Response,
  next: NextFunction
) => {
  const id = req.user?._id;
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(CARD_NOT_FOUND_MESSAGE);
      }

      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(INVALID_CARD_LIKE_DATA_MESSAGE));
      }

      return next(err);
    });
};
