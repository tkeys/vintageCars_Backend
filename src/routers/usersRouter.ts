import express, { Request, Response } from 'express';
import { users } from '../data/mockUsers';
import { User } from '../types/User';

const router = express.Router();

// query
// base url:"http://localhost:8080/api/v1/users/"
router.get('/', (request: Request, response: Response) => {
  console.log(request);
  response.status(200).json({
    data: users,
    message: 'Users retrieved succcessfully',
    status: 'Success',
  });
});

router.get('/:id', (request: Request, response: Response) => {
  const userId = request.params.id;
  const user = users.find((user: User) => user.id === userId);
  if (user) {
    response.status(200).json({
      data: user,
      message: 'user found successfully!',
      status: 'success',
    });
  } else {
    response.status(404).json({ message: 'User not found', status: 'fail' });
  }
});

router.put('/:id', (request: Request, response: Response) => {
  const userId = request.params.id;
  const user = users.find((user: User) => user.id === userId);
  if (user) {
    const updatedUser = request.body;
    users.splice(users.indexOf(user), 1, updatedUser);
    response.status(200).json({
      data: updatedUser,
      message: 'user updated successfully',
      status: 'success',
    });
  } else {
    response.status(404).json({ message: 'User not found', status: 'fail' });
  }
});

router.delete('/:id', (request: Request, response: Response) => {
  const userId = request.params.id;
  const user = users.find((user: User) => user.id === userId);
  if (user) {
    users.splice(users.indexOf(user), 1);
    response.status(200).json({ message: 'User deleted', status: 'success' });
  } else {
    response.status(404).json({ message: 'User not found', status: 'error' });
  }
});

export default router;
