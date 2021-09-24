import { GenreDto } from './domain/genre.dto'
import { GenresRepository } from './genres.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GenresService {
  constructor(private readonly genresRepository: GenresRepository) {}

  async create(createDto: GenreDto) {
    return await this.genresRepository.findOrCreate(createDto, { name: createDto.name })
  }

  findAll() {
    return this.genresRepository.findAll()
  }

  async findOneById(id: string) {
    const genre = await this.genresRepository.findOneById(id)
    return genre
  }

  update(id: string, updateDto: GenreDto) {
    return this.genresRepository.update(id, updateDto)
  }

  remove(id: string) {
    return this.genresRepository.remove(id)
  }
}
