import { BaseRepositorySequelizeModel } from './domain/base.repository.model'
import { BaseRepositorySequelizeRepository } from './base-repository-sequelize.repository'
import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
  imports: [SequelizeModule.forFeature([BaseRepositorySequelizeModel])],
  controllers: [],
  providers: [BaseRepositorySequelizeRepository]
})
export class BaseRepositorySequelizeModule {}
