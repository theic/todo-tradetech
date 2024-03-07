import { Request, Response } from 'express';
import { controller, httpGet } from 'inversify-express-utils';

@controller('/')
export class TechnicalController {
  @httpGet('/')
  public ready(req: Request, res: Response): void {
    res.sendStatus(200);
  }
}
