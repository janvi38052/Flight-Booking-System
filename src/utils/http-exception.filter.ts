// src/common/filters/http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from './logger.service'; // Path to your logger service
import { ErrorMessages } from './messages'; // Path to your messages

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new LoggerService();

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorResponse = ErrorMessages[exception.message] || ErrorMessages.INTERNAL_SERVER_ERROR;

    // Log the error
    this.logger.error(`${exception.name} - ${exception.message}`, HttpExceptionFilter.name);

    // Send response
    response.status(errorResponse.statusCode).json({
      statusCode: errorResponse.statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: errorResponse.message,
      errorCode: errorResponse.errorCode,
    });
  }
}
