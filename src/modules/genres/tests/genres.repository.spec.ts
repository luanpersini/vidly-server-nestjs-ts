import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { AppModule } from '../../../app.module'
import { Genre } from '../domain/genre.model'
import { GenreDto } from '../domain/genre.dto'
import { GenresRepository } from '../genres.repository'

const name = 'any name'
const createDto = { name: name } as GenreDto

describe('Test for Base Repository Controller (e2e)', () => {
  let app: INestApplication
  let genresRepository: GenresRepository

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true
      })
    )
    genresRepository = app.get(GenresRepository)
    await app.init()
  })
  afterEach(async () => {
    await Genre.destroy({
      where: {},
      truncate: true
    })
    await app.close()
  })
  describe('findOrCreate', () => {
    test('should Return **Ok** with the created data', async () => {
      const createdGenre = await genresRepository.create(createDto)
      const result = await genresRepository.findOneByName(createDto.name)
      expect(result).toBeTruthy()
      expect(result.id).toBeTruthy()
      expect(result.id).toEqual(createdGenre.id)
      expect(result.name).toEqual(createDto.name)
    })
  })
})
