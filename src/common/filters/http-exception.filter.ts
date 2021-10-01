import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'

import { Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()

    const error = exception.getResponse() as Error
    const message = error.message.length === 1 ? error.message[0] : error.message
    const name = error['error'] ? error['error'] : error.name

    response.status(status).json({
      statusCode: status,
      name: name,
      message: message
    })
  }
}
