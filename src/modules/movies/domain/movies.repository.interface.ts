import { Genre } from './movie.model'
import { GenreDto } from './movie.dto'

export interface GenresRepositoryInterface {
  findAll: (dto: GenreDto) => Promise<Genre[]>
}
// export type GenresRepositoryInterface = BaseRepositoryInterface<Genre, GenreDto>
