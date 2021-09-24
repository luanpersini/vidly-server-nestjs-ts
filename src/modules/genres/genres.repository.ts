import { BaseRepositoryAbstract } from 'src/common/interfaces/repositories/base.repository.abstract'
import { Genre } from './domain/genre.model'
import { GenreDto } from './domain/genre.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GenresRepository extends BaseRepositoryAbstract<Genre, string, GenreDto, GenreDto> {
  constructor() {
    super(Genre)
  }
}
