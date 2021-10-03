import { BaseRepositoryAbstract } from 'src/infra/database/base-repository/base-repository-sequelize/base.repository.abstract'
import { BaseRepositorySequelizeDto } from './domain/base-test.dto'
import { BaseRepositorySequelizeModel } from './domain/base.repository.model'
import { Injectable } from '@nestjs/common'

@Injectable()
export class BaseRepositorySequelizeRepository extends BaseRepositoryAbstract<
  BaseRepositorySequelizeModel,
  string,
  BaseRepositorySequelizeDto,
  BaseRepositorySequelizeDto
> {
  constructor() {
    super(BaseRepositorySequelizeModel)
  }
}
