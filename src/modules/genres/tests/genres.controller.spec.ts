import { ArgumentMetadata, BadRequestException, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as faker from 'faker'
import { ItemAlreadyExistsError } from 'src/common/errors/item-already-exists-error'
import { ItemNotFoundError } from '../../../common/errors/item-not-found-error'
import { GenreDto } from '../domain/genre.dto'
import { Genre } from '../domain/genre.model'
import { GenresController } from '../genres.controller'
import { GenresService } from '../genres.service'

const genreName = faker.music.genre()
const genreId = faker.datatype.uuid()
const createDto = { name: genreName } as GenreDto
const fakeGenre = { id: genreId, name: genreName } as Genre

describe('GenresController', () => {
  let genresController: GenresController
  let genresService: GenresService

  beforeEach(async () => {
    const GenresServiceProvider = {
      provide: GenresService,
      useFactory: () => ({
        create: jest.fn(() => fakeGenre),
        findAll: jest.fn(() => [fakeGenre]),
        remove: jest.fn(() => 1)
      })
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenresController],
      providers: [GenresServiceProvider]
    }).compile()

    genresController = module.get<GenresController>(GenresController)
    genresService = module.get<GenresService>(GenresService)
  })

  describe('genresController.create', () => {
    test('should call genresService.create with the correct values', async () => {
      await genresController.create(createDto)
      expect(genresService.create).toHaveBeenCalledWith(createDto)
    })

    test('should Return **BadRequest** if there is already an genre with the given name', async () => {
      jest.spyOn(genresService, 'create').mockReturnValueOnce(null)
      const response = await genresController.create(createDto)
      expect(response).toEqual(new BadRequestException(new ItemAlreadyExistsError('Genre', 'Name')))
    })
    test('should Return **BadRequest** if validation returns an error', async () => {
      const target: ValidationPipe = new ValidationPipe({ transform: true, whitelist: true })
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: GenreDto,
        data: ''
      }
      await target.transform(<GenreDto>{}, metadata).catch((err) => {
        expect(err.getResponse().statusCode).toEqual(400)
      })
    })
    test('should Return **Ok** with the created genre data', async () => {
      const response = await genresController.create(createDto)
      expect(response).toEqual(fakeGenre)
    })
  })
  describe('genresController.findAll', () => {
    test('should Return **Ok** with the located genres data', async () => {
      const response = await genresController.findAll()
      expect(genresService.findAll).toHaveBeenCalledTimes(1)
      expect(response).toEqual([fakeGenre])
    })
  })
  describe('genresController.remove', () => {
    test('should call genresService.remove with the correct values', async () => {
      await genresController.remove(genreId)
      expect(genresService.remove).toHaveBeenCalledWith(genreId)
    })
    test('should Return **NotFound** if no genre with the given ID is found', async () => {
      jest.spyOn(genresService, 'remove').mockReturnValueOnce(Promise.resolve(0))
      const response = await genresController.remove(genreId)
      expect(response).toEqual(new BadRequestException(new ItemNotFoundError('Genre')))
    })
  })
})
