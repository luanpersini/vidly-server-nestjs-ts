import { BaseRepositoryInterface } from './base.repository.interface'
import { Repository } from 'sequelize-typescript'

// Implemented based on Sequelize ORM
export abstract class BaseRepositoryAbstract<Entity, ID, CreateDto, UpdateDto>
  implements BaseRepositoryInterface<Entity, ID, CreateDto, UpdateDto>
{
  private entity: Repository<any>

  protected constructor(entity: Repository<Entity>) {
    this.entity = entity
  }

  public async findAll(): Promise<Entity[]> {
    return this.entity.findAll()
  }
  public async create(createDto: CreateDto): Promise<Entity> {
    return await this.entity.create({ ...createDto })
  }
  public async findOrCreate(createDto: CreateDto, where: Record<string, unknown>): Promise<Entity> {
    const [createdItem, created] = await this.entity.findOrCreate({
      where: where,
      defaults: {
        ...createDto
      }
    })
    if (created) {
      return createdItem
    }
    return null
  }
  public async findOneById(id: ID): Promise<Entity> {
    return await this.entity.findOne({
      where: {
        id: id
      }
    })
  }

  public async update(id: ID, updateDto: UpdateDto): Promise<Entity> {
    let item = await this.entity.findOne({
      where: { id: id }
    })
    if (!item) {
      return null
    }
    item = await item.update({ ...updateDto })
    return item
  }

  public async remove(id: ID): Promise<any> {
    return await this.entity.destroy({
      where: { id: id }
    })
  }
}
