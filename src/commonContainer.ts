import { Container } from 'inversify';
import { Logger } from '@infrastructure/logging/Logger';
import { ConsoleLogger } from '@infrastructure/logging/ConsoleLogger';
import { FirestoreListRepository } from '@infrastructure/repositories/FirestoreListRepository';
import { ListRepository } from '@domain/List';
import { TaskRepository } from '@domain/Task';
import { FirestoreTaskRepository } from '@infrastructure/repositories/FirestoreTaskRepository';

import './app/List/ListController';
import './app/Task/TaskController';
import { ListService, TaskService } from './app';
import { FirestoreListService } from '@infrastructure/services/FirestoreListService';
import { FirestoreTaskService } from '@infrastructure/services/FirestoreTaskService';

const commonContainer = new Container();

commonContainer.bind<TaskRepository>(TaskRepository).to(FirestoreTaskRepository);
commonContainer.bind<TaskService>(TaskService).to(FirestoreTaskService);

commonContainer.bind<ListRepository>(ListRepository).to(FirestoreListRepository);
commonContainer.bind<ListService>(ListService).to(FirestoreListService);

commonContainer.bind<Logger>(Logger).to(ConsoleLogger);

export { commonContainer };
