import { AppError } from './AppError';
import { AppException } from './AppException';

export class AuthenticationError extends AppError<AppException> {
  public readonly httpCode: number = 401;

  constructor(message?: string, error?: Error) {
    super(
      AppException.AUTHENTICATION,
      message || 'Authentication error!',
      error,
    );
  }
}
