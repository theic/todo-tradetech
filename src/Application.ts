import { Container, inject, injectable } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import express, {
  Application as ExpressApplication,
  Request,
  Response,
  NextFunction,
} from 'express';
import { Logger } from '@infrastructure/logging/Logger';
import { ServerConfig } from '@config/server';
import cors from 'cors';
import { AppError } from '@domain/exceptions';

@injectable()
export class Application {
  private server: InversifyExpressServer;

  @inject(Logger) private logger: Logger;
  @inject(ServerConfig) private readonly config: ServerConfig;

  public setup(container: Container) {
    this.server = new InversifyExpressServer(
      container,
    );
    this.setupServer();
    return this;
  }

  private setupServer(): void {
    this.server.setConfig((app: ExpressApplication) => {
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      app.use(cors());
      app.use(express.static('public'));
      app.set('x-powered-by', 0);
    });

    this.server.setErrorConfig((app: ExpressApplication) => {
      app.use(
        (
          err: Error,
          _req: Request,
          res: Response,
          _next: NextFunction,
        ) => {
          const message = err.message || 'Internal server error!';
          const status = err instanceof AppError ? err.httpCode : 500;

          this.logger.error(
            this.isProductionEnv ? message : err.stack || message,
          );

          res.status(status).send(message);
        },
      );
    });
  }

  public async start(): Promise<void> {
    await new Promise<void>(resolve =>
      this.server
        .build()
        .listen({ port: this.config.port }, () => {
          this.logger.log(
            `Server running in ${this.config.nodeEnv} mode on port ${this.config.port}`
          );
          resolve();
        }),
    );
  }

  private isProductionEnv(): boolean {
    return this.config.nodeEnv === 'production';
  }
}
