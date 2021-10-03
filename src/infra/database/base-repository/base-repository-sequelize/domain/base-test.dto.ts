import { IsNotEmpty, IsString, Length } from 'class-validator'

export class BaseRepositorySequelizeDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50, {
    message: 'Name must be between $constraint1 and $constraint2 characters.'
  })
  name: string
}
