import { AuthenticationMiddleware } from '@app/middlewares';
import { ServerConfig } from '@config/server';
import { DefaultListManager, ListManager, ListRepository } from '@domain/List';
import { DefaultTaskManager, TaskManager, TaskRepository } from '@domain/Task';
import { DefaultUserManager, UserManager, UserRepository } from '@domain/User';
import { ConsoleLogger } from '@infrastructure/logging/ConsoleLogger';
import { Logger } from '@infrastructure/logging/Logger';
import {
  FirestoreListRepository,
  FirestoreTaskRepository,
  FirestoreUserRepository,
} from '@infrastructure/repositories';
import { Application } from 'Application';
import { Container } from 'inversify';

const container = new Container();

container.bind(AuthenticationMiddleware).toSelf().inSingletonScope();
container.bind(ServerConfig).toSelf().inSingletonScope();
container.bind(Application).toSelf().inSingletonScope();

container.bind<TaskRepository>(TaskRepository)
  .to(FirestoreTaskRepository)
  .inSingletonScope();
container.bind<TaskManager>(TaskManager)
  .to(DefaultTaskManager)
  .inSingletonScope();

container.bind<ListRepository>(ListRepository)
  .to(FirestoreListRepository)
  .inSingletonScope();
container.bind<ListManager>(ListManager)
  .to(DefaultListManager)
  .inSingletonScope();

container.bind<UserRepository>(UserRepository)
  .to(FirestoreUserRepository)
  .inSingletonScope();
container.bind<UserManager>(UserManager)
  .to(DefaultUserManager)
  .inSingletonScope();

container.bind<Logger>(Logger).to(ConsoleLogger).inSingletonScope();

export { container };
