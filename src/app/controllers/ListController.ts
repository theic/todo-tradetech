import { CreateListInput, UpdateListInput } from '@app/inputs';
import { AuthenticationMiddleware, validateInputMiddleware } from '@app/middlewares';
import { ListOutput } from '@app/outputs';
import { List, ListManager, ListRepository } from '@domain/List';
import { AppError, AppException } from '@domain/exceptions';
import { Request, Response } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
  interfaces,
  request,
  requestBody,
  response
} from 'inversify-express-utils';

@controller('/lists', AuthenticationMiddleware)
export class ListController implements interfaces.Controller {
  constructor(
    @inject(ListManager) private readonly listManager: ListManager,
    @inject(ListRepository) private readonly listRepository: ListRepository,
  ) {}

  @httpGet('/')
  public async getLists(@request() req: Request, @response() res: Response) {
    const lists = await this.listRepository.findForUser(res.locals.user.id);
    return res
      .status(200)
      .send(
        lists.map((list) => ListOutput.fromList(list))
      );
  }

  @httpPost(
    '/create',
    validateInputMiddleware(CreateListInput),
  )
  public async createList(
    @response() res: Response,
    @requestBody() body: CreateListInput,
  ) {
    const userId = res.locals.user.id;
    const newList = await this.listManager.create({
      userId,
      title: body.title,
    });
    return res
      .status(201)
      .send(ListOutput.fromList(newList));
  }

  @httpPatch(
    '/:listId/update',
    validateInputMiddleware(UpdateListInput),
  )
  public async updateList(
    @request() req: Request,
    @response() res: Response,
    @requestBody() body: UpdateListInput,
  ) {
    const listId = req.params.listId;
    const list = await this.listRepository.get(listId);

    this.assertList(list, res.locals.user.id);

    const updatedList = await this.listManager.update(list, {
      title: body.title,
    });

    return res
      .status(200)
      .send(ListOutput.fromList(updatedList));
  }

  @httpDelete(
    '/:listId/delete',
  )
  public async deleteList(
    @request() req: Request,
    @response() res: Response,
  ) {
    const listId = req.params.listId;
    const list = await this.listRepository.get(listId);

    this.assertList(list, res.locals.user.id);

    await this.listManager.delete(list);

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
