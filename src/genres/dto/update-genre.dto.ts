import { CreateGenreDto } from './create-genre.dto'
import { PartialType } from '@nestjs/mapped-types'

export class UpdateGenreDto extends PartialType(CreateGenreDto) {}
