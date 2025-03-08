import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse()['error'];

    if (error) {
      response.status(status).json({
        statusCode: status,
        error,
        timestamp: new Date().toISOString(),
        message: exception.getResponse()['message'],
      });
    } else {
      response.status(status).json({
        statusCode: status,
        error: exception.getResponse()['message'],
        timestamp: new Date().toISOString(),
      });
    }
  }
}
