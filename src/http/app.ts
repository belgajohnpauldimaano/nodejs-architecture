import express from 'express';
import bodyParser from 'body-parser';
import { UsersService } from '../domain/users/usersService';
import { errorHandler } from './routes/error';
import { userRoute } from './routes/user';

const app = express();
app.use(bodyParser.json());

export const appFactory = (userService: UsersService) => {
  const user = userRoute(userService);
  app.use('/users', user);
  app.use(errorHandler);
  return app;
};

export const appFactoryV2 = (Services: any, logger: any) => {
  const user = userRoute(Services.userService);

  app.use((_req: any, _res: any, next: any) => {
    console.log('loooogggggg');
    logger.info({ msg: 'dfds' });
    next();
  });
  app.use('/users', user);
  app.use(errorHandler);
  return app;
};
