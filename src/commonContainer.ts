import 'reflect-metadata';
import { Container } from 'inversify';
import { Logger } from '@infrastructure/logging/Logger';
import { ConsoleLogger } from '@infrastructure/logging/ConsoleLogger';
import { FirestoreListRepository } from '@infrastructure/repositories/FirestoreListRepository';
import { ListRepository } from '@domain/List';

const commonContainer = new Container();
commonContainer.bind<ListRepository>(ListRepository).to(FirestoreListRepository);
commonContainer.bind<Logger>(Logger).to(ConsoleLogger);

export { commonContainer };
