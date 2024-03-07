import { AppException } from './AppException';
import { AppExceptionHttpStatus } from './AppExceptionHttpStatus';

export class AppError<T extends AppException> extends Error {
  public readonly httpCode: number;
  public readonly code: T;
  public readonly error?: Error;

  constructor(code: T, message?: string, error?: Error) {
    super(message || code);
    this.code = code;
    this.error = error;
    this.httpCode = AppExceptionHttpStatus[code] || 500;
  }
}
