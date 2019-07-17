import express, { Request, Response, NextFunction } from 'express';
import { asyncWrapper } from '../utils/asyncWrapper';
import { UsersService } from '../../domain/users/usersService';

const router = express.Router();

export function userRoute(userService: UsersService) {
  router.get(
    '/',
    asyncWrapper(async (_: Request, res: Response) => {
      const users = await userService.getAllUsers();
      res.json(users);
    }),
  );

  router.get(
    '/xxx',
    asyncWrapper(async (_: Request, res: Response) => {
      res.json({ users: 'ssss' });
    }),
  );
  router.get(
    '/hello',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        console.log(req, 'req');
        await res.json({ data: 'this is hellos' });
        return;
      } catch (err) {
        next(err);
      }
    },
  );
  // TODO: Install middleware to validate the input
  router.post(
    '/',
    asyncWrapper(async (req: Request, res: Response) => {
      const { firstName, lastName, age } = req.body;
      const user = await userService.createUser(firstName, lastName, age);
      res.json(user);
    }),
  );

  return router;
}
