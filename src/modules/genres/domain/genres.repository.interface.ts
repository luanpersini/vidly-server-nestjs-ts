import { Genre } from './genre.model'
import { GenreDto } from './genre.dto'

export interface GenresRepositoryInterface {
  findAll: (dto: GenreDto) => Promise<Genre[]>
}
// export type GenresRepositoryInterface = BaseRepositoryInterface<Genre, GenreDto>
