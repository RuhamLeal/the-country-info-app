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
  async catch(exception: Error | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const timestamp = new Date(Date.now());
    const path = request.url;

    const isHttpErr = exception instanceof HttpException;
    const status = isHttpErr ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const getData = () => {
      if (isHttpErr) {
        const resData = exception.getResponse();
        const isStringRes = typeof resData === 'string';

        const result = isStringRes ? { message: resData } : resData;

        return {
          ...result,
          message: (result as any).message || 'Internal server error'
        };
      }

      return {
        message: 'Internal server error'
      }
    };

    const { message, ...rest } = getData();

    response.code(status).send({
      status: 'error',
      code: status,
      message,
      data: {
        timestamp: timestamp.toUTCString(),
        path,
        ...rest,
      }
    });
  }
}
