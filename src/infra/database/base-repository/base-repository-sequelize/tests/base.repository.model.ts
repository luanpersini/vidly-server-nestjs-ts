import { Column, Length, Model, Table, Unique } from 'sequelize-typescript'
import { DataTypes, UUIDV4 } from 'sequelize'

@Table
export class BaseRepositorySequelizeModel extends Model {
  @Column({
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: UUIDV4
  })
  id: string

  @Length({ min: 3, max: 50 })
  @Unique({
    name: 'Name',
    msg: 'Name should be unique'
  })
  @Column
  name: string
}
