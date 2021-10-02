import * as faker from 'faker'

import { Test, TestingModule } from '@nestjs/testing'

import { Genre } from '../domain/genre.model'
import { GenreDto } from '../domain/genre.dto'
import { GenresRepository } from '../genres.repository'
import { GenresService } from '../genres.service'
import { StringHelper } from 'src/common/helpers/string.helper'

const genreName = faker.music.genre()
const createDto = { name: genreName.toLowerCase() } as GenreDto
const fakeGenre = { id: faker.datatype.uuid(), name: genreName } as Genre

describe('GenresService', () => {
  let genresRepository: GenresRepository
  let genresService: GenresService

  beforeEach(async () => {
    const GenresRepositoryProvider = {
      provide: GenresRepository,
      useFactory: () => ({
        findOrCreate: jest.fn(() => fakeGenre),
        findOne: jest.fn(() => fakeGenre)
      })
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [GenresService, GenresRepositoryProvider]
    }).compile()

    genresRepository = module.get<GenresRepository>(GenresRepository)
    genresService = module.get<GenresService>(GenresService)
  })

  describe('genresService.create', () => {
    test('should call genresRepository.findOrCreate with the correct values', async () => {
      await genresService.create(createDto)
      expect(genresRepository.findOrCreate).toHaveBeenCalledWith(
        { name: StringHelper.titleCase(createDto.name) },
        {
          name: createDto.name
        }
      )
    })
    test('should Return **Ok** with the created genre data', async () => {
      const response = await genresService.create(createDto)
      expect(response).toEqual(fakeGenre)
    })
  })
})
