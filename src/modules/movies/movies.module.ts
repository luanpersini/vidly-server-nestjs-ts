import { Genre } from './domain/movie.model'
import { GenresController } from './movies.controller'
import { GenresRepository } from './movies.repository'
import { GenresService } from './movies.service'
import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
  imports: [SequelizeModule.forFeature([Genre])],
  // imports: [DatabaseModule],
  controllers: [GenresController],
  providers: [GenresRepository, GenresService]
})
export class GenresModule {}
