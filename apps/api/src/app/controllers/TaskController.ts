import { AuthenticationMiddleware, validateInputMiddleware } from '@app/middlewares';
import { TaskManager } from '@domain/Task';
import { Response } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpDelete,
  httpPatch,
  httpPost,
  interfaces,
  requestBody,
  requestParam,
  response,
} from 'inversify-express-utils';
import { List, ListRepository } from '@domain/List';
import { AppError, AppException } from '@domain/exceptions';
import { CreateTaskInput, UpdateTaskInput } from '..';
import { TaskOutput } from '@app/outputs';

@controller('/lists', AuthenticationMiddleware)
export class TaskController implements interfaces.Controller {
  constructor(
    @inject(ListRepository) private readonly listRepository: ListRepository,
    @inject(TaskManager) private readonly taskManager: TaskManager,
  ) {}

  @httpPost(
    '/:listId/tasks/create',
    validateInputMiddleware(CreateTaskInput),
  )
  public async createTask(
    @requestParam('listId') listId: string,
    @response() res: Response,
    @requestBody() body: CreateTaskInput,
  ) {
    const userId = res.locals.user.id;
    const list = await this.listRepository.get(listId);

    this.assertList(list, userId);

    const newTask = await this.taskManager.create(listId, {
      ...body,
    });
    return res
      .status(201)
      .send(TaskOutput.fromTask(newTask));
  }

  @httpPatch(
    '/:listId/tasks/:taskId/update',
    validateInputMiddleware(UpdateTaskInput),
  )
  public async updateTask(
    @requestParam('listId') listId: string,
    @requestParam('taskId') taskId: string,
    @response() res: Response,
    @requestBody() body: UpdateTaskInput,
  ) {
    const userId = res.locals.user.id;
    const list = await this.listRepository.get(listId);

    this.assertList(list, userId);

    const updatedTask = await this.taskManager.update(taskId, {
      ...body,
    });
    return res
      .status(200)
      .send(TaskOutput.fromTask(updatedTask));
  }

  @httpDelete(
    '/:listId/tasks/:taskId/delete',
  )
  public async deleteTask(
    @requestParam('listId') listId: string,
    @requestParam('taskId') taskId: string,
    @response() res: Response,
  ) {
    const userId = res.locals.user.id;
    const list = await this.listRepository.get(listId);

    this.assertList(list, userId);

    await this.taskManager.delete(taskId);
    return res.sendStatus(204);
  }

  private assertList(list: List, userId: string) {
    if (!list) {
      throw new AppError(
        AppException.NOT_FOUND,
        'List not found'
      );
    }

    if (list.userId !== userId) {
      throw new AppError(
        AppException.AUTHORIZATION,
        'User not authorized to access this task',
      );
    }
  };
}
