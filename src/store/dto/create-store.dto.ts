import { IsDefined, IsNotEmpty } from 'class-validator';

export class CreateStoreDto {
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsNotEmpty()
  address: string;
}
