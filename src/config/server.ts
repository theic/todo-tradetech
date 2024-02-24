import { injectable } from 'inversify';

@injectable()
export class ServerConfig {
  get port(): number {
    return +(process.env.HTTP_PORT || 8080);
  }
}
