import { Request, Response } from 'express';
import { BaseHttpController, controller, httpGet, httpPost, interfaces, request, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import { ListService } from './ListService';

@controller('/lists')
export class ListController
  extends BaseHttpController
  implements interfaces.Controller {
  constructor(
    @inject(ListService) private listService: ListService
  ) {
    super();
  }

  @httpGet('/')
  public async getLists(@request() req: Request, @response() res: Response) {
    const lists = await this.listService.getAllLists();
    return this.ok(lists);
  }

  @httpPost('/')
  public async createList(@request() req: Request, @response() res: Response) {
    const newList = await this.listService.createList(req.body);
    return this.ok(newList);
  }
}
