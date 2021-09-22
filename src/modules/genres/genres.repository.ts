import { Genre } from './entities/genre.entity'
import { GenreDto } from './dto/genre.dto'
import { GenresRepositoryInterface } from './interfaces/genres.repository.interface'

const genres: Genre[] = [
  {
    id: 1,
    name: 'Action'
  },
  {
    id: 2,
    name: 'Drama'
  },
  {
    id: 3,
    name: 'Terror'
  }
]

export class GenresRepository implements GenresRepositoryInterface {
  async create(createDto: GenreDto): Promise<Genre> {
    const id = genres.length + 1

    const genre: Genre = {
      id,
      ...createDto
    }

    genres.push(genre)
    return genre
  }

  async findAll(): Promise<Genre[]> {
    return genres.filter(Boolean)
  }

  async findOneById(id: number): Promise<Genre> {
    const genre = genres.find((genre) => genre?.id === id)
    return genre
  }

  async update(id: number, updateDto: GenreDto): Promise<Genre> {
    const index = genres.findIndex((genre) => genre?.id === id)

    if (index < 0) {
      return null
    }

    const genre: Genre = {
      id,
      ...updateDto
    }

    genres[index] = genre
    return genres[index]
  }

  async remove(id: number) {
    const index = genres.findIndex((genre) => genre?.id === id)

    if (index < 0) {
      return false
    }

    delete genres[index]
    return true
  }
}
