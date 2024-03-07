import { injectable } from 'inversify';

@injectable()
export class ServerConfig {
  get port(): number {
    return +(process.env.HTTP_PORT || 8080);
  }

  get nodeEnv(): string {
    return process.env.NODE_ENV || 'development';
  }

  get logLevel(): string {
    return process.env.LOG_LEVEL || 'info';
  }
}
