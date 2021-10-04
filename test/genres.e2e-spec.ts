import { INestApplication, ValidationPipe } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Test } from '@nestjs/testing'
import * as faker from 'faker'
import { Server } from 'http'
import * as request from 'supertest'
import { ItemAlreadyExistsError } from '../src/common/errors/item-already-exists-error'
import { ItemNotFoundError } from '../src/common/errors/item-not-found-error'
import { StringHelper } from '../src/common/helpers/string.helper'
import { sequelizeConfig } from '../src/config/database/sequelize.config'
import { GenreDto } from '../src/modules/genres/domain/genre.dto'
import { Genre } from '../src/modules/genres/domain/genre.model'
import { GenresModule } from '../src/modules/genres/genres.module'



const name = 'any name'
const createDto = { name: StringHelper.titleCase(name) } as GenreDto
const uri = '/genres'

describe('Genres End-To-End Tests', () => {
  let app: INestApplication
  let server: Server

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      // You can get from app.module.ts only the module that you will import, plus the database connection
      imports: [SequelizeModule.forRoot(sequelizeConfig), GenresModule]
      // imports: [AppModule]
    }).compile()
    app = module.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true
      })
    )
    server = app.getHttpServer()
    await app.init()
  })
  afterEach(async () => {
    await Genre.destroy({
      where: {},
      truncate: true
    })
    await app.close()
  })

  describe('/Post Genres', () => {
    const execPost = () => {
      return request(server).post(uri).send({ name })
    }
    test('should Return **Ok** with the created genre data', async () => {
      const { status, body: result } = await execPost()
      expect(status).toBe(201)
      expect(result).toBeTruthy()
      expect(result.id).toBeTruthy()
      expect(result.name).toEqual(StringHelper.titleCase(name))
    })
    test('should Return **BadRequest** if there is already an genre with the given name', async () => {
      await Genre.create(createDto)
      const { status, body: result } = await execPost()
      expect(status).toBe(400)
      expect(result.name).toEqual(new ItemAlreadyExistsError('Genre', 'Name').name)
    })
    test('should Return **BadRequest** if an validation error occurs', async () => {
      const { status } = await request(server).post(uri).send({})
      expect(status).toBe(400)
    })
  })
  describe('/Get Genres', () => {
    const execGet = () => {
      return request(server).get(uri)
    }
    test('should return all genres (findAll)', async () => {
      await Genre.create(createDto)
      const allGenres = await Genre.findAll()
      const { status, body: result } = await execGet()
      expect(status).toBe(200)
      expect(result[0].name).toEqual(allGenres[0].name)
    })
  })
  describe('/Delete Genres', () => {
    const execDel = (genreId: string) => {
      return request(server).delete(`${uri}/${genreId}`)
    }
    test('should Return **1** if the genre was successfuly deleted', async () => {
      const genre = await Genre.create(createDto)
      const { status, body: result } = await execDel(genre.id)
      expect(status).toBe(200)
      expect(result.deletedRows).toEqual(1)
    })
    test('should Return **NotFound** if the genre with the given ID was not found', async () => {
      const { status, body: result } = await execDel(faker.datatype.uuid())
      expect(status).toBe(404)
      expect(result.name).toEqual(new ItemNotFoundError('Genre').name)
    })
    test('should Return **BadRequest** if an invalid ID is provided', async () => {
      const { status } = await execDel('this_is_not_a_uuid')
      expect(status).toBe(400)
    })
  })
})
