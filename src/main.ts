import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import env from './config/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  ),
    app.useGlobalFilters(new HttpExceptionFilter()),
    app.setGlobalPrefix('api')
  await app.listen(env.port)
}
bootstrap()
