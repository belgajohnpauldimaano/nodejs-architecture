import { config } from './configuration';
import { /*appFactory,*/ appFactoryV2 } from './http/app';
import { logger } from './libs/logger';
import { UserRepository } from './data/users/userRepository';
import { UsersService } from './domain/users/usersService';
import { init } from './signals';
import { Database } from './data/database';

/*
  my sample of dependenct injection
*/
import {
  createContainer,
  asClass,
  asValue,
  asFunction,
  InjectionMode,
} from 'awilix';

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

const InsRepositories = () => {
  return {
    userRepository: new UserRepository(),
  };
};

const Services = (Repositories: any) => {
  return {
    userService: new UsersService(Repositories.userRepository),
  };
};
// // SYSTEM
container.register({
  config: asValue(config),
  logger: asValue(logger),
  Database: asClass(Database).singleton(),

  Repositories: asFunction(InsRepositories).singleton(),
  Services: asFunction(Services).singleton(),
  appV2: asFunction(appFactoryV2).singleton(),
});

container.cradle.Database.connect();
const server = container.cradle.appV2.listen(config.port, () => {
  logger.info(`Listening on *:${config.port}`);
});

/*
my sample of dependenct injection ends here
*/

/**
 * THIS IS THE DEFAULT CONFIG
 */
// const database = new Database(config.connectionString as any);
// const database = new Database();
// database.connect();

// const userRepository = new UserRepository();
// const userService = new UsersService(userRepository);

// const app = appFactory(userService);
// const server = app.listen(config.port, () => {
//   logger.info(`Listening on *:${config.port}`);
// });
/**
 * THIS IS THE DEFAULT CONFIG
 */

const shutdown = init(() => {
  server.close(async () => {
    // await database.disconnect();
    await container.cradle.Database.disconnect();
  });
});

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
