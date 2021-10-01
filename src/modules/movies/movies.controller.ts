import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common'
import { ItemAlreadyExistsError } from 'src/common/errors/item-already-exists-error'
import { CreateMovieDto } from './dto/create-movie.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'
import { MoviesService } from './movies.service'

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    const genre = await this.moviesService.create(createMovieDto)
    if (!genre) {
      return new BadRequestException(new ItemAlreadyExistsError('Genre', 'Name'))
    }
    return genre
  }

  @Get()
  findAll() {
    return this.moviesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id)
  }
}
