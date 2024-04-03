import express from 'express';
import ordersRouter from './ordersRouter';
import { hasPermission } from '../middlewares/hasPermission';
import { isRequestedUser } from '../middlewares/isRequestedUser';
import {
  banUserHandler,
  changePasswordHandler,
  recoverPasswordHandler,
  getAllUsers,
  deleteUser,
  getUserByIdHandler,
  updateUser,
} from '../controllers/usersController';

import { isAdmin } from '../middlewares/isAdmin';

const usersRouter = express.Router();

usersRouter.use('/:userId/orderlists', hasPermission, ordersRouter);
usersRouter.get(
  '/:userId/recover-password',
  isRequestedUser,
  recoverPasswordHandler
);
usersRouter.post(
  '/:userId/change-password',
  isRequestedUser,
  changePasswordHandler
);
usersRouter.patch('/:userId/ban', isAdmin, banUserHandler);
//
usersRouter.get('/', getAllUsers);

usersRouter.delete('/:userId', isRequestedUser, hasPermission, deleteUser);

usersRouter.get('/:userId', isRequestedUser, hasPermission, getUserByIdHandler);

usersRouter.put('/:userId', isRequestedUser, hasPermission, updateUser);

export default usersRouter;
