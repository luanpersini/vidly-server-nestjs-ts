import { Test, TestingModule } from '@nestjs/testing'

import { Genre } from '../domain/movie.model'
import { GenreDto } from '../domain/movie.dto'
import { GenresModule } from '../movies.module'
import { GenresRepository } from '../movies.repository'
import { INestApplication } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { sequelizeConfig } from '../../../config/database/sequelize.config'

const name = 'any name'
const createDto = { name: name } as GenreDto

describe('GenresRepository', () => {
  let app: INestApplication
  let genresRepository: GenresRepository

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      // You can get from app.module.ts only the module that you will import, plus the database connection
      imports: [SequelizeModule.forRoot(sequelizeConfig), GenresModule]
    }).compile()
    app = moduleFixture.createNestApplication()
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
  describe('findOneByName', () => {
    test('should return the item found by name', async () => {
      const createdGenre = await genresRepository.create(createDto)
      const result = await genresRepository.findOneByName(createDto.name)
      expect(result).toBeTruthy()
      expect(result.id).toBeTruthy()
      expect(result.id).toEqual(createdGenre.id)
      expect(result.name).toEqual(createDto.name)
    })
  })
})
