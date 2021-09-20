import { GenresController } from './genres.controller'
import { GenresService } from './genres.service'
import { Module } from '@nestjs/common'

@Module({
  controllers: [GenresController],
  providers: [GenresService]
})
export class GenresModule {}
