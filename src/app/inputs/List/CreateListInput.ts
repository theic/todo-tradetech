import { ListConstants } from '@domain/List';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateListInput {  
  @IsNotEmpty()
  @Length(
    ListConstants.LIST_TITLE_MIN_LEN,
    ListConstants.LIST_TITLE_MAX_LEN,
  )
  title: string;
}
