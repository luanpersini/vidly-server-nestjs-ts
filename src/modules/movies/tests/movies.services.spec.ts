import * as faker from 'faker'

import { Test, TestingModule } from '@nestjs/testing'

import { Genre } from '../domain/movie.model'
import { GenreDto } from '../domain/movie.dto'
import { GenresRepository } from '../movies.repository'
import { GenresService } from '../movies.service'
import { StringHelper } from 'src/common/helpers/string.helper'

const genreId = faker.datatype.uuid()
const genreName = faker.music.genre()
const createDto = { name: genreName.toLowerCase() } as GenreDto
const fakeGenre = { id: genreId, name: genreName } as Genre

describe('GenresService', () => {
  let genresRepository: GenresRepository
  let genresService: GenresService

  beforeEach(async () => {
    const GenresRepositoryProvider = {
      provide: GenresRepository,
      useFactory: () => ({
        findOrCreate: jest.fn(() => fakeGenre),
        findAll: jest.fn(() => [fakeGenre]),
        remove: jest.fn(() => 1)
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
  describe('genresService.findAll', () => {
    test('should return the located genres data', async () => {
      const response = await genresService.findAll()
      expect(genresRepository.findAll).toHaveBeenCalledTimes(1)
      expect(response).toEqual([fakeGenre])
    })
  })
  describe('genresService.remove', () => {
    test('should call genresService.remove with the correct values', async () => {
      const response = await genresService.remove(genreId)
      expect(genresRepository.remove).toHaveBeenCalledWith(genreId)
      expect(response).toEqual(1)
    })
  })
})
