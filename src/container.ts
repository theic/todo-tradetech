import { Container } from 'inversify';
import { Logger } from '@infrastructure/logging/Logger';
import { ConsoleLogger } from '@infrastructure/logging/ConsoleLogger';
import { FirestoreListRepository } from '@infrastructure/repositories/FirestoreListRepository';
import { ListRepository } from '@domain/List';
import { TaskRepository } from '@domain/Task';
import { FirestoreTaskRepository } from '@infrastructure/repositories/FirestoreTaskRepository';
import { ListService, TaskService } from './app';
import { FirestoreListService } from '@infrastructure/services/FirestoreListService';
import { FirestoreTaskService } from '@infrastructure/services/FirestoreTaskService';
import { ServerConfig } from '@config/server';
import './app/List/ListController';
import './app/Task/TaskController';
import { Application } from 'Application';

const container = new Container();

container.bind(ServerConfig).toSelf().inSingletonScope();
container.bind(Application).toSelf().inSingletonScope();

container.bind<TaskRepository>(TaskRepository)
  .to(FirestoreTaskRepository)
  .inSingletonScope();
container.bind<TaskService>(TaskService)
  .to(FirestoreTaskService)
  .inSingletonScope();

container.bind<ListRepository>(ListRepository)
  .to(FirestoreListRepository)
  .inSingletonScope();
container.bind<ListService>(ListService)
  .to(FirestoreListService)
  .inSingletonScope();

container.bind<Logger>(Logger).to(ConsoleLogger).inSingletonScope();

export { container };
