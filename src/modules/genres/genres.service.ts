import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'

import { GenreDto } from './domain/genre.dto'
import { GenresRepository } from './genres.repository'
import { ItemAlreadyExistsError } from '../../common/errors/item-already-exists-error'
import { ItemNotFoundError } from '../../common/errors/item-not-found-error'
import { StringHelper } from 'src/common/helpers/string.helper'

@Injectable()
export class GenresService {
  constructor(private readonly genresRepository: GenresRepository) {}

  async create(createDto: GenreDto) {
    createDto.name = StringHelper.titleCase(createDto.name)
    const genre = await this.genresRepository.findOrCreate(createDto, { name: createDto.name })
    if (!genre) {
      throw new BadRequestException(new ItemAlreadyExistsError('Genre', 'Name'))
    }
    return
  }

  findAll() {
    return this.genresRepository.findAll()
  }

  async remove(id: string) {
    const deletedRows = await this.genresRepository.remove(id)
    if (deletedRows === 0) {
      throw new NotFoundException(new ItemNotFoundError('Genre'))
    }
    return { deletedRows }
  }
  /*
  // The commented functions are working as expected. This section wont be used by Vidly Front App and will be commented to speed up the learning process. 
   
  async findOneById(id: string) {
    const genre = await this.genresRepository.findOneById(id)
    return genre
  }
  async findOneByName(name: string) {
    name = StringHelper.titleCase(name)
    const genre = this.genresRepository.findOneByName(name)
    return genre
  }

  async update(id: string, updateDto: GenreDto) {
    updateDto.name = StringHelper.titleCase(updateDto.name)
    return await this.genresRepository.update(id, updateDto)
  }
  */
}
