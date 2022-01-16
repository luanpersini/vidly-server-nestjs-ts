import { BaseRepositoryAbstract } from 'src/infra/database/base-repository/base-repository-sequelize/base.repository.abstract'
import { Genre } from './domain/movie.model'
import { GenreDto } from './domain/movie.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GenresRepository extends BaseRepositoryAbstract<Genre, string, GenreDto, GenreDto> {
  constructor() {
    super(Genre)
  }
  // This function is not being used but will remain uncommented as an example of test using sequelize. (see docs)
  async findOneByName(name: string): Promise<Genre> {
    return await Genre.findOne({
      where: {
        name
      }
    })
  }
}
