import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GenresModule } from './modules/genres/genres.module'
import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { sequelizeConfig } from './config/database/sequelize.config'

@Module({
  imports: [SequelizeModule.forRoot(sequelizeConfig), GenresModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
