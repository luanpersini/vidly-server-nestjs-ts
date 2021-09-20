import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Module } from '@nestjs/common'
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [GenresModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
