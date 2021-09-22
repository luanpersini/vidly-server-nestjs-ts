export interface BaseRepositoryInterface<Entity, ID, CreateDto, UpdateDto, RemoveResponse> {
  findAll: () => Promise<Entity[]>
  findOneById: (id: ID) => Promise<Entity>
  create: (createDto: CreateDto) => Promise<Entity>
  update: (id: ID, updateDto: UpdateDto) => Promise<Entity>
  remove: (id: ID) => Promise<RemoveResponse>
}
