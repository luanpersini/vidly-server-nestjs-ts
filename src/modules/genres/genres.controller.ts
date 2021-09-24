import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post
} from '@nestjs/common'
import { ItemNotFoundError } from 'src/common/errors/item-not-found-error'
import { Messages } from 'src/common/standard-messages/standard.messages'
import { GenreDto } from './domain/genre.dto'
import { GenresService } from './genres.service'

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  async create(@Body() body: GenreDto) {
    const genre = await this.genresService.create(body)
    if (!genre) {
      throw new BadRequestException('A genre with the given name already exists')
    }
    return genre
  }

  @Get()
  findAll() {
    return this.genresService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const genre = await this.genresService.findOneById(id)
      if (!genre) {
        throw new NotFoundException(new ItemNotFoundError('genre'))
      }
      return genre
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: GenreDto) {
    return await this.genresService.update(id, body)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deleted = await this.genresService.remove(id)
      if (deleted === 0) {
        throw new NotFoundException(new ItemNotFoundError('genre'))
      }
      return Messages.deleteSuccess('Genre')
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
