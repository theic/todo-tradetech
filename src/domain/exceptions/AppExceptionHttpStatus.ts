import { AppException } from './AppException';

export const AppExceptionHttpStatus = {
  [AppException.INTERNAL_SERVER]: 500,
  [AppException.AUTHORIZATION]: 403,
  [AppException.AUTHENTICATION]: 401,
  [AppException.FORBIDDEN]: 403,
  [AppException.BAD_REQUEST]: 400,
  [AppException.CONFLICT]: 409,
  [AppException.NOT_FOUND]: 404,
  [AppException.NOT_IMPLEMENTED]: 501,
  [AppException.VALIDATION]: 422,
  [AppException.ENTITY_NAME_ERROR]: 422,
  [AppException.CANNOT_REMOVE]: 450,
};
