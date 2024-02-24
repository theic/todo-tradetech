import 'reflect-metadata';
import { Container, inject } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import express, { Application as ExpressApplication } from 'express';
import { Logger } from './infrastructure/logging/Logger';

class Application {
  private server: InversifyExpressServer;
  private readonly _nodeEnv: string;
  private readonly _logLevel: string;

  @inject(Logger) private logger: Logger;

  constructor(container: Container) {
    this.server = new InversifyExpressServer(container);
    this._nodeEnv = process.env.NODE_ENV || 'development';
    this._logLevel = process.env.LOG_LEVEL || 'info';

    this.setupServer();
  }

  private setupServer(): void {
    this.server.setConfig((app: ExpressApplication) => {
      app.use(express.json());
    });

    this.server.setErrorConfig((app: ExpressApplication) => {
      app.use(
        (
          err: Error,
          _req: express.Request,
          res: express.Response,
          _next: express.NextFunction,
        ) => {
          const message = err.message || 'Internal server error!';

          this.logger.error(
            this.isProductionEnv ? message : err.stack || message,
          );

          res.status(500).send(message);
        },
      );
    });
  }

  get nodeEnv(): string {
    return this._nodeEnv;
  }

  private isProductionEnv(): boolean {
    return this._nodeEnv === 'production';
  }

  public build(): ExpressApplication {
    return this.server.build();
  }
}

export { Application };
