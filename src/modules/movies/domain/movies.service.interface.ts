import { Genre } from './movie.model'
import { GenreDto } from './movie.dto'

export interface GenresServiceInterface {
  findAll: () => Promise<Genre[]>
  findOneById: (id: number) => Promise<Genre>
  create: (createDto: GenreDto) => Promise<Genre>
  update: (id: number, updateDto: GenreDto) => Promise<Genre>
  remove: (id: number) => Promise<boolean>
}
