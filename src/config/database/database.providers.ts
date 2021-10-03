import { Genre } from 'src/modules/genres/domain/genre.model'
import { Sequelize } from 'sequelize-typescript'
import { sequelizeConfig } from './sequelize.config'

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(sequelizeConfig)
      sequelize.addModels([Genre])
      await sequelize.sync()
      return sequelize
    }
  }
]
