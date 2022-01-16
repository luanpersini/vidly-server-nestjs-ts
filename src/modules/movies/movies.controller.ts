import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common'
import { GenreDto } from './domain/movie.dto'
import { GenresService } from './movies.service'

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  async create(@Body() body: GenreDto) {
    return await this.genresService.create(body)
  }

  @Get()
  findAll() {
    return this.genresService.findAll()
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.genresService.remove(id)
  }

  /*
  // The commented functions are working as expected. This section wont be used by Vidly Front App and will be commented to speed up the learning process.
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
*/
}
