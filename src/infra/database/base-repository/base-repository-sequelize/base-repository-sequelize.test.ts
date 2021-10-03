import * as faker from 'faker'

import { Test, TestingModule } from '@nestjs/testing'

import { BaseRepositorySequelizeDto } from './domain/base-test.dto'
import { BaseRepositorySequelizeModel } from './domain/base.repository.model'
import { BaseRepositorySequelizeModule } from './base-repository-sequelize.module'
import { BaseRepositorySequelizeRepository } from './base-repository-sequelize.repository'
import { INestApplication } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { sequelizeConfig } from '../../../../config/database/sequelize.config'

const name = faker.name.findName()
const createDto = { name: name } as BaseRepositorySequelizeDto

describe('Test for Base Repository Controller (e2e)', () => {
  let app: INestApplication
  let baseRepository: BaseRepositorySequelizeRepository

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SequelizeModule.forRoot(sequelizeConfig), BaseRepositorySequelizeModule]
    }).compile()
    app = moduleFixture.createNestApplication()
    baseRepository = app.get(BaseRepositorySequelizeRepository)
    await app.init()
  })
  afterEach(async () => {
    await BaseRepositorySequelizeModel.destroy({
      where: {},
      truncate: true
    })
    await app.close()
  })
  describe('findOrCreate', () => {
    test('should Return **Ok** with the created data', async () => {
      const result = await baseRepository.findOrCreate(createDto, { name: createDto.name })
      expect(result).toBeTruthy()
      expect(result.id).toBeTruthy()
      expect(result.name).toEqual(name)
    })
    test('should Return **Null** if the name already exists in the database.', async () => {
      await baseRepository.create(createDto)
      const result = await baseRepository.findOrCreate(createDto, { name: createDto.name })
      expect(result).toBeNull()
    })
  })
  describe('findAll', () => {
    test('should Return **Ok** with the located data', async () => {
      // create a genre
      await baseRepository.create(createDto)
      // locate the genre using the model
      let resultModel = []
      resultModel = await BaseRepositorySequelizeModel.findAll()
      // locate the genre using the repository
      let resultRepository = []
      resultRepository = await baseRepository.findAll()
      // compare both values
      expect(resultRepository).toBeTruthy()
      expect(resultRepository[0].name).toEqual(resultModel[0].name)
    })
  })
})
