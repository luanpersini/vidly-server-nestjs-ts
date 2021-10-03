import { Genre } from './domain/genre.model'
import { GenresController } from './genres.controller'
import { GenresRepository } from './genres.repository'
import { GenresService } from './genres.service'
import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
  imports: [SequelizeModule.forFeature([Genre])],
  // imports: [DatabaseModule],
  controllers: [GenresController],
  providers: [GenresRepository, GenresService]
})
export class GenresModule {}
