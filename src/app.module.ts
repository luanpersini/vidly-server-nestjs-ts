import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GenresModule } from './modules/genres/genres.module'
import { Module } from '@nestjs/common'

// import env from './config/env'

@Module({
  imports: [GenresModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
