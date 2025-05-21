import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SalesTransaction extends Document {
  @Prop({ required: true })
  storeId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({
    required: true,
    default: Date.now,
    expire: 60 * 60 * 12, // 12 hours in seconds
  })
  timestamp: Date;
}

export const SalesTransactionSchema = SchemaFactory.createForClass(SalesTransaction);
