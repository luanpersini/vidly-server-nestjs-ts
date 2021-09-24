import { Genre } from './genre.model'
import { GenreDto } from './genre.dto'

export interface GenresServiceInterface {
  findAll: () => Promise<Genre[]>
  findOneById: (id: number) => Promise<Genre>
  create: (createDto: GenreDto) => Promise<Genre>
  update: (id: number, updateDto: GenreDto) => Promise<Genre>
  remove: (id: number) => Promise<boolean>
}
