
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCatDto {
  @IsNotEmpty({ message: '이름은 필수 입력 항목입니다.' })
  @IsString({ message: '유효한 문자열이어야 합니다.' })
  readonly name: string;
}
