import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
} from '../controllers/cards';
import {
  validateCardIdParam,
  validateCreateCardBody
} from '../middlewares/validators';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', validateCreateCardBody, createCard);
cardsRouter.delete('/:cardId', validateCardIdParam, deleteCard);
cardsRouter.put('/:cardId/likes', validateCardIdParam, likeCard);
cardsRouter.delete('/:cardId/likes', validateCardIdParam, dislikeCard);

export default cardsRouter;
