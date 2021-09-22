import { GenresController } from './genres.controller'
import { GenresRepository } from './genres.repository'
import { GenresService } from './genres.service'
import { Module } from '@nestjs/common'

@Module({
  controllers: [GenresController],
  providers: [
    {
      provide: 'GenresServiceInterface',
      useClass: GenresService
    },
    {
      provide: 'GenresRepositoryInterface',
      useClass: GenresRepository
    }
  ]
})
export class GenresModule {}
