import { BaseRepositoryAbstract } from 'src/common/database/repositories/base.repository.abstract'
import { Genre } from './domain/genre.model'
import { GenreDto } from './domain/genre.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GenresRepository extends BaseRepositoryAbstract<Genre, string, GenreDto, GenreDto> {
  constructor() {
    super(Genre)
  }

  async findOneByName(name: string): Promise<Genre> {
    return await Genre.findOne({
      where: {
        name
      }
    })
  }
}
