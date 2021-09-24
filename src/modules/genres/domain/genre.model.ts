import { Column, Length, Model, Table, Unique } from 'sequelize-typescript'
import { DataTypes, UUIDV4 } from 'sequelize'

@Table
export class Genre extends Model {
  @Column({
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: UUIDV4
  })
  id: string

  @Length({ min: 3, max: 50 })
  @Unique({
    name: 'Genre',
    msg: 'Genre should be unique'
  })
  @Column
  name: string
}
