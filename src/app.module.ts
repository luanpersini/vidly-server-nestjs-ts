import { BaseRepositorySequelizeModule } from './infra/database/base-repository/base-repository-sequelize/base-repository-sequelize.module'
import { GenresModule } from './modules/genres/genres.module'
import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { sequelizeConfig } from './config/database/sequelize.config'

@Module({
  imports: [SequelizeModule.forRoot(sequelizeConfig), GenresModule, BaseRepositorySequelizeModule],
  controllers: [],
  providers: []
})
export class AppModule {}
