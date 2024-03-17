import express, { Request, Response } from 'express';
import { users } from '../data/mockUsers';
import { User } from '../types/User';

const router = express.Router();

// query
// base url:"http://localhost:8080/api/v1/users/"
router.get('/', (request: Request, response: Response) => {
  console.log(request);
  response.status(200).json({ data: users, message: 'Success', status: 200 });
});

router.get('/:id', (request: Request, response: Response) => {
  const userId = request.params.id;
  const user = users.find((user: User) => user.id === userId);
  if (user) {
    response.status(200).json({ data: user, message: 'Success', status: 200 });
  } else {
    response.status(404).json({ message: 'User not found', status: 404 });
  }
});

router.put('/:id', (request: Request, response: Response) => {
  const userId = request.params.id;
  const user = users.find((user: User) => user.id === userId);
  if (user) {
    const updatedUser = request.body;
    users.splice(users.indexOf(user), 1, updatedUser);
    response
      .status(200)
      .json({ data: updatedUser, message: 'Success', status: 200 });
  } else {
    response.status(404).json({ message: 'User not found', status: 404 });
  }
});

router.delete('/:id', (request: Request, response: Response) => {
  const userId = request.params.id;
  const user = users.find((user: User) => user.id === userId);
  if (user) {
    users.splice(users.indexOf(user), 1);
    response.status(200).json({ message: 'User deleted', status: 200 });
  } else {
    response.status(404).json({ message: 'User not found', status: 404 });
  }
});

export default router;
