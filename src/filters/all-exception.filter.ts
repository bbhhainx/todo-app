import { ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { ArgumentsHost, Catch } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { url } from 'inspector';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      //   headers: request.headers,
      //   query: request.query,
      //   body: request.body,
      //   params: request.params,
      url: request.url,
      timestamp: new Date().toISOString(),
      //   exceptioin: exception['name'],
      error: exception['response'] || 'Internal Server Error',
    };

    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
