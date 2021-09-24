export interface BaseRepositoryInterface<Entity, ID, CreateDto, UpdateDto> {
  findAll(): Promise<Entity[]>
  create(createDto: CreateDto): Promise<Entity>
  findOrCreate(createDto: CreateDto, where: Record<string, unknown>): Promise<Entity>
  findOneById: (id: ID) => Promise<Entity>
  update: (id: ID, updateDto: UpdateDto) => Promise<Entity>
  remove: (id: ID) => Promise<any>
}
