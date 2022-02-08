import {
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import * as serializeError from 'serialize-error';

export class HttpExceptionFilter implements ExceptionFilter {
  public catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const { route } = ctx.getRequest();
    const statusCode =
      (exception.getStatus && exception.getStatus()) ||
      HttpStatus.INTERNAL_SERVER_ERROR;

    if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      const logData = {
        ERROR: serializeError.serializeError(exception),
        METHOD: route.methods,
        ROUTE: route.path,
      };

      Logger.log(serializeError.serializeError(logData));
    }

    const errorMessage = exception.response
      ? exception.response.message
      : 'Internal Server Error';

    response.status(statusCode).json({
      message: errorMessage,
      statusCode,
      timestamp: new Date().toISOString(),
    });
  }
}
