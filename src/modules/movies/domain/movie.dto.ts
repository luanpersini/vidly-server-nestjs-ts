import { IsNotEmpty, IsString, Length } from 'class-validator'

export class GenreDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50, {
    message: 'Genre must be between $constraint1 and $constraint2 characters.'
  })
  name: string
}
