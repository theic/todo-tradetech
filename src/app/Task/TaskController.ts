import { Request, Response } from 'express';
import { BaseHttpController, controller, httpGet, httpPost, interfaces, request, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import { TaskService } from './TaskService';

@controller('/tasks')
export class TaskController
  extends BaseHttpController
  implements interfaces.Controller {
  constructor(
    @inject(TaskService) private taskService: TaskService,
  ) {
    super();
  }

  @httpGet('/')
  public async getTasks(@request() req: Request, @response() res: Response) {
    const tasks = await this.taskService.getAllTasks();
    return this.ok(tasks);
  }

  @httpPost('/')
  public async createTask(@request() req: Request, @response() res: Response) {
    const newTask = await this.taskService.createTask(req.body);
    return this.ok(newTask);
  }
}
