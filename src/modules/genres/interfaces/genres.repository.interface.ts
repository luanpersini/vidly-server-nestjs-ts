import { BaseRepositoryInterface } from 'src/repositories/base.repository.interface'
import { Genre } from '../entities/genre.entity'
import { GenreDto } from '../dto/genre.dto'

export type GenresRepositoryInterface = BaseRepositoryInterface<
  Genre,
  number,
  GenreDto,
  GenreDto,
  boolean
>
