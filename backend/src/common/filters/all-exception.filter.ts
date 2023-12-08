import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    let httpStatus;
    let responseBody;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      responseBody = exception.getResponse();
    } else if (exception instanceof Error) {
      switch (exception.name) {
        case 'NotFoundError':
          httpStatus = HttpStatus.NOT_FOUND;
          break;

        case 'ConflictError':
          httpStatus = HttpStatus.CONFLICT;
          break;

        case 'BadRequestError':
          httpStatus = HttpStatus.BAD_REQUEST;
          break;

        default:
          httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
          break;
      }
      responseBody = {
        statusCode: httpStatus,
        message: exception.message,
        error: exception.name,
      };
    }

    response.status(httpStatus).json(responseBody);
  }
}
