import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post
} from '@nestjs/common'
import { ItemAlreadyExistsError } from 'src/common/errors/item-already-exists-error'
import { ItemNotFoundError } from 'src/common/errors/item-not-found-error'
import { GenreDto } from './domain/genre.dto'
import { GenresService } from './genres.service'

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  async create(@Body() body: GenreDto) {
    const genre = await this.genresService.create(body)
    if (!genre) {
      return new BadRequestException(new ItemAlreadyExistsError('Genre', 'Name'))
    }
    return genre
  }

  @Get()
  findAll() {
    return this.genresService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const genre = await this.genresService.findOneById(id)
    if (!genre) {
      throw new NotFoundException(new ItemNotFoundError('Genre'))
    }
    return genre
  }

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() body: GenreDto) {
    const genreExists = await this.genresService.findOneByName(body.name)
    if (genreExists && genreExists.id !== id) {
      throw new BadRequestException('A genre with the given name already exists')
    }
    const genre = await this.genresService.update(id, body)
    if (!genre) {
      throw new NotFoundException(new ItemNotFoundError('Genre'))
    }
    return genre
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const deleted = await this.genresService.remove(id)
    if (deleted === 0) {
      throw new NotFoundException(new ItemNotFoundError('Genre'))
    }
  }
}
