import { ArgumentMetadata, BadRequestException, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as faker from 'faker'
import { ItemAlreadyExistsError } from 'src/common/errors/item-already-exists-error'
import { GenreDto } from '../domain/genre.dto'
import { Genre } from '../domain/genre.model'
import { GenresController } from '../genres.controller'
import { GenresService } from '../genres.service'

const genreName = faker.music.genre()
const createDto = { name: genreName } as GenreDto
const fakeGenre = { id: faker.datatype.uuid(), name: genreName } as Genre

describe('GenresController', () => {
  let genresController: GenresController
  let genresService: GenresService

  beforeEach(async () => {
    const GenresServiceProvider = {
      provide: GenresService,
      useFactory: () => ({
        create: jest.fn(() => fakeGenre),
        findOne: jest.fn(() => fakeGenre)
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

    test('should Return **Forbidden** if there is already an genre with the given name', async () => {
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
})
