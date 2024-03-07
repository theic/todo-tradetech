import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validateInputMiddleware<T extends object>(
  cls: new () => T
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (req, res, next) => {
    // Use req.query for GET requests and req.body for POST requests
    const source = req.method === 'GET' ? req.query : req.body;
    const output = plainToInstance(cls, source);

    const errors = await validate(output);

    if (errors.length > 0) {
      res.status(400).json(convertErrors(errors));
    } else {
      next();
    }
  };
}

function convertErrors(errors: ValidationError[]): any {
  return { errors };
}
