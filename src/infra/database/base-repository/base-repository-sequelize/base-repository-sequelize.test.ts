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
const name2 = faker.name.findName()
const randomUuid = faker.datatype.uuid()
const createDto = { name: name } as BaseRepositorySequelizeDto
const createDto2 = { name: name2 } as BaseRepositorySequelizeDto

describe('Base Repository Sequelize', () => {
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
  describe('Validation Test', () => {
    test('should **Throw** if a item with the given name already exists in the database - @Unique()', async () => {
      await baseRepository.create(createDto)
      await expect(baseRepository.create(createDto)).rejects.toThrowError()
    })
    test('should **Throw** if the given ID is not a UUID - @Column({ type: DataTypes.UUID })', async () => {
      await expect(baseRepository.findOneById('im_not_a_uuid')).rejects.toThrowError()
    })
  })
  describe('findAll()', () => {
    test('should Return the located item data', async () => {
      // create a genre
      await baseRepository.create(createDto)
      await baseRepository.create(createDto2)
      // locate the genre using the model
      const modelResult = await BaseRepositorySequelizeModel.findAll()
      // locate the genre using the repository
      const repositoryResult = await baseRepository.findAll()
      // compare both values
      expect(repositoryResult).toBeTruthy()
      expect(repositoryResult[0].name).toEqual(modelResult[0].name)
      expect(repositoryResult[1].name).toEqual(modelResult[1].name)
    })
  })
  describe('Create()', () => {
    test('should Return the created item data', async () => {
      const result = await baseRepository.create(createDto)
      expect(result).toBeTruthy()
      expect(result.id).toBeTruthy()
      expect(result.name).toEqual(name)
    })
  })
  describe('findOrCreate()', () => {
    test('should return the created item data', async () => {
      const result = await baseRepository.findOrCreate(createDto, { name: createDto.name })
      expect(result).toBeTruthy()
      expect(result.id).toBeTruthy()
      expect(result.name).toEqual(name)
    })
    test('should Return **Null** if a item with the given name already exists in the database.', async () => {
      await baseRepository.create(createDto)
      const result = await baseRepository.findOrCreate(createDto, { name: createDto.name })
      expect(result).toBeNull()
    })
  })
  describe('findOneById()', () => {
    test('should Return the item with the given ID', async () => {
      const item = await baseRepository.create(createDto)
      const result = await baseRepository.findOneById(item.id)
      expect(result.id).toEqual(item.id)
      expect(result.name).toEqual(item.name)
    })
    test('should Return **Null** if the item with the given ID is not found', async () => {
      const result = await baseRepository.findOneById(randomUuid)
      expect(result).toBeNull()
    })
  })
  describe('findOneByCondition()', () => {
    test('should Return the item with the given condition', async () => {
      const item = await baseRepository.create(createDto)
      const result = await baseRepository.findOneByCondition({ id: item.id })
      expect(result.id).toEqual(item.id)
      expect(result.name).toEqual(item.name)
    })
    test('should Return **Null** if the item with the given contidion is not found', async () => {
      const result = await baseRepository.findOneByCondition({ id: randomUuid })
      expect(result).toBeNull()
    })
  })
  describe('update()', () => {
    test('should Return **Null** if the item with the given ID is not found', async () => {
      const result = await baseRepository.update(randomUuid, createDto)
      expect(result).toBeNull()
    })
    test('should Return the updated item on success', async () => {
      const item = await baseRepository.create(createDto)
      const newName = 'New Name'
      const result = await baseRepository.update(item.id, { name: newName })
      expect(result.id).toEqual(item.id)
      expect(result.name).toEqual(newName)
    })
  })
  describe('remove()', () => {
    test('should Return **1** if the item was successfuly deleted', async () => {
      const item = await baseRepository.create(createDto)
      const result = await baseRepository.remove(item.id)
      expect(result).toEqual(1)
    })
    test('should Return **0** if the item with the given ID is not found', async () => {
      const result = await baseRepository.remove(randomUuid)
      expect(result).toEqual(0)
    })
  })
})
