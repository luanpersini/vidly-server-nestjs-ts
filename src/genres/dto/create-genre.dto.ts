import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateGenreDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 30, {
    message: 'Genre must be between $constraint1 and $constraint2 characters.'
  })
  text: string
}
