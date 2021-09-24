import { SequelizeModuleOptions } from '@nestjs/sequelize'
import env from '../env'

export const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: env.database.host,
  port: parseInt(env.database.port),
  username: env.database.username,
  password: env.database.password,
  database: env.database.name,
  autoLoadModels: true,
  synchronize: true
}
