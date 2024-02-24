import { Logger } from './Logger';
import { injectable } from 'inversify';

@injectable()
export class ConsoleLogger implements Logger {
    log(message: string): void {
        console.log(message);
    }

    error(message: string): void {
        console.error(message);
    }

    warn(message: string): void {
        console.warn(message);
    }

    info(message: string): void {
        console.info(message);
    }
}
