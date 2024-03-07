export interface Logger {
  log(message: string): void;
  error(message: string): void;
  warn(message: string): void;
  info(message: string): void;
}

export const Logger = Symbol('Logger');
