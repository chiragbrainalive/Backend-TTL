import { IsString, IsNumber, IsDate, IsOptional, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSalesTransactionDto {
  @IsString({ message: 'storeId must be a string' })
  @IsNotEmpty({ message: 'storeId is required' })
  storeId: string;

  @IsNumber({}, { message: 'amount must be a number' })
  @IsNotEmpty({ message: 'amount is required' })
  amount: number;

  @IsOptional()
  @IsDate({ message: 'timestamp must be a valid date' })
  @Type(() => Date)
  timestamp?: Date;
}
