import { CreateMovieDto } from './dto/create-movie.dto'
import { Injectable } from '@nestjs/common'
import { UpdateMovieDto } from './dto/update-movie.dto'

@Injectable()
export class MoviesService {
  async create(createMovieDto: CreateMovieDto) {
    return '66'
  }

  findAll() {
    return `This action returns all movies`
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`
  }

  remove(id: number) {
    return `This action removes a #${id} movie`
  }
}
