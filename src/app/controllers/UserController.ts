import { UserManager } from '@domain/User';
import { inject } from 'inversify';
import { controller, interfaces, httpPost, BaseHttpController } from 'inversify-express-utils';

@controller('/users')
export class UserController
  extends BaseHttpController
  implements interfaces.Controller {
  constructor(
    @inject(UserManager) private readonly userManager: UserManager,
  ) {
    super();
  }

  @httpPost('/create')
  public async createAnonymousUser(
    req: Request,
    res: Response,
  ): Promise<{ token: string }> {
    const token = await this.userManager.createAnonymous();
    return { token };
  }
}
