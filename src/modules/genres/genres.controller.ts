import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post
} from '@nestjs/common'
import { ItemNotFoundError } from 'src/common/errors/item-not-found-error'
import { GenreDto } from './dto/genre.dto'
import { GenresServiceInterface } from './interfaces/genres.service.interface'

@Controller('genres')
export class GenresController {
  constructor(
    @Inject('GenresServiceInterface')
    private readonly genresService: GenresServiceInterface
  ) {}

  @Post()
  create(@Body() body: GenreDto) {
    return this.genresService.create(body)
  }

  @Get()
  findAll() {
    return this.genresService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const genre = await this.genresService.findOneById(+id)
      if (!genre) {
        throw new NotFoundException(new ItemNotFoundError('genre'))
      }
      return genre
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: GenreDto) {
    return this.genresService.update(+id, body)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.genresService.remove(+id)
  }
}
