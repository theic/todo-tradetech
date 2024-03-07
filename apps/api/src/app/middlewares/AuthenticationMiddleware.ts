import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '@domain/User';
import { BaseMiddleware } from 'inversify-express-utils';
import { inject, injectable } from 'inversify';
import { auth } from 'firebase-admin';
import { Logger } from '@infrastructure/logging/Logger';

@injectable()
export class AuthenticationMiddleware extends BaseMiddleware {
  private readonly auth: auth.Auth;

  constructor(
    @inject(UserRepository)
    private readonly userRepository: UserRepository,
    @inject(Logger)
    private readonly logger: Logger,
  ) {
    super();
    this.auth = auth();
  }

  public async handler(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { authorization } = req.headers;

      const { 1: token } = authorization.split('Bearer ');

      if (!token) {
        throw new Error('No token provided');
      }

      const decodedToken = await this.auth.verifyIdToken(token);
      const user = await this.userRepository.get(decodedToken.uid);

      if (!user) {
        throw new Error('No user found');
      }

      res.locals = { user };
    } catch (err) {
      this.logger.error(err);
      res.sendStatus(401);
    }
    next();
  }
}
