import { Inject, Injectable } from '@nestjs/common'
import { GenreDto } from './dto/genre.dto'
import { GenresRepositoryInterface } from './interfaces/genres.repository.interface'

@Injectable()
export class GenresService {
  constructor(
    @Inject('GenresRepositoryInterface')
    private readonly genresRepository: GenresRepositoryInterface
  ) {}

  create(createDto: GenreDto) {
    return this.genresRepository.create(createDto)
  }

  findAll() {
    return this.genresRepository.findAll()
  }

  async findOneById(id: number) {
    const genre = await this.genresRepository.findOneById(id)
    return genre
  }

  update(id: number, updateDto: GenreDto) {
    return this.genresRepository.update(id, updateDto)
  }

  remove(id: number) {
    return this.genresRepository.remove(id)
  }
}
