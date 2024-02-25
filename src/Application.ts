import { Container, inject, injectable } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import express, {
  Application as ExpressApplication,
  Request,
  Response,
  NextFunction,
} from 'express';
import { Logger } from './infrastructure/logging/Logger';
import { ServerConfig } from '@config/server';

@injectable()
class Application {
  private server: InversifyExpressServer;

  @inject(Logger) private logger: Logger;
  @inject(ServerConfig) private readonly config: ServerConfig;

  public setup(container: Container) {
    this.server = new InversifyExpressServer(container, null, { rootPath: 'api/v1' });
    this.setupServer();
    return this;
  }

  private setupServer(): void {
    this.server.setConfig((app: ExpressApplication) => {
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
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

          this.logger.error(
            this.isProductionEnv ? message : err.stack || message,
          );

          res.status(500).send(message);
        },
      );
    });
  }

  public async start(): Promise<void> {
    await new Promise<void>(resolve =>
      this.server
        .build()
        .listen({ port: this.config.port }, () => {
          console.log(`Server running in ${this.config.nodeEnv} mode on port ${this.config.port}`);
          resolve();
        }),
    );
  }

  private isProductionEnv(): boolean {
    return this.config.nodeEnv === 'production';
  }
}

export { Application };
