import { Test, TestingModule } from '@nestjs/testing'

import { BadRequestException } from '@nestjs/common'
import { CreateMovieDto } from './dto/create-movie.dto'
import { ItemAlreadyExistsError } from 'src/common/errors/item-already-exists-error'
import { MoviesController } from './movies.controller'
import { MoviesService } from './movies.service'

describe('MoviesController', () => {
  let controller: MoviesController
  let spyService: MoviesService
  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: MoviesService,
      useFactory: () => ({
        create: jest.fn(() => []),
        findAll: jest.fn(() => []),
        findOne: jest.fn(() => {}),
        update: jest.fn(() => {}),
        delete: jest.fn(() => {})
      })
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService, ApiServiceProvider]
    }).compile()
    controller = module.get<MoviesController>(MoviesController)
    spyService = module.get<MoviesService>(MoviesService)
  })
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [MoviesController],
  //     providers: [MoviesService, ApiServiceProvider]
  //   }).compile()

  //   controller = module.get<MoviesController>(MoviesController)
  // })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
  it('calling saveNotes method', () => {
    const dto = new CreateMovieDto()
    expect(controller.create(dto)).not.toEqual(null)
  })
  it('calling saveNotes method', () => {
    const dto = new CreateMovieDto()
    controller.create(dto)
    expect(spyService.create).toHaveBeenCalledWith(dto)
  })
  test('should Return **Forbidden** if there is already an genre with the given name', async () => {
    const dto = new CreateMovieDto()
    jest.spyOn(spyService, 'create').mockReturnValueOnce(null)
    const httpResponse = await controller.create(dto)
    expect(httpResponse).toEqual(
      new BadRequestException(new ItemAlreadyExistsError('Genre', 'Name'))
    )
  })
})

/*
describe('AddGenreController', () => {
  test('should call Validation with correct values', async () => {
    const { sut, validationStub, validationSchemaStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body, validationSchemaStub)
  })  
  test('should Return **BadRequest** if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce('any_error')
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new ValidationError('any_error')))
  })  
  test('should Return **Forbidden** if there is already an genre with the given name', async () => {
    const { sut, addGenreStub } = makeSut()
    jest.spyOn(addGenreStub, 'add').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new GenreExistsError()))
  })
  test('should Return **Unexpected Error** if something fail while trying to create the new genre', async () => {
    const { sut, addGenreStub } = makeSut()
    jest.spyOn(addGenreStub, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('should Return **Ok** with the created genre data', async () => {
    const { sut, addGenreStub } = makeSut()
    jest.spyOn(addGenreStub, 'add').mockReturnValueOnce(Promise.resolve(mockGenreModel()))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(mockGenreModel()))
  })
})
*/
