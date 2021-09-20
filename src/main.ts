import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'
import env from './common/config/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(env.port)
}
bootstrap()
