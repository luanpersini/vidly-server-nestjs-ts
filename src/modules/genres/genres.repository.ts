import { Injectable } from '@nestjs/common'
import { BaseRepositoryAbstract } from 'src/common/database/repositories/base.repository.abstract'
import { GenreDto } from './domain/genre.dto'
import { Genre } from './domain/genre.model'

@Injectable()
export class GenresRepository extends BaseRepositoryAbstract<Genre, string, GenreDto, GenreDto> {
  constructor() {
    super(Genre)
  }
}
