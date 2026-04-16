import { Router } from 'express';
import {
  getCurrentUser,
  getUser,
  getUsers,
  updateUser,
  updateUserAvatar
} from '../controllers/users';
import {
  validateUpdateAvatarBody,
  validateUpdateProfileBody,
  validateUserIdParam
} from '../middlewares/validators';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', validateUpdateProfileBody, updateUser);
usersRouter.patch('/me/avatar', validateUpdateAvatarBody, updateUserAvatar);
usersRouter.get('/:userId', validateUserIdParam, getUser);

export default usersRouter;
