import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const timestamp = new Date().toISOString();
    const path = request.url;
    const isHttpError = exception instanceof HttpException;

    const status = isHttpError
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = isHttpError
      ? exception.getResponse()
      : { message: 'Internal server error' };

    const errorData =
      typeof errorResponse === 'string'
        ? { message: errorResponse }
        : (errorResponse as Record<string, unknown>);

    const message = errorData.message || 'Internal server error';

    const responseBody = {
      status: 'error',
      code: status,
      message,
      data: {
        timestamp,
        path,
        ...errorData,
      },
    };

    response.status(status).send(responseBody);
  }
}
