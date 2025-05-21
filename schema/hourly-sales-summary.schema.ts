import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class HourlySalesSummary extends Document {
  @Prop({ required: true })
  storeId: string;

  @Prop({ required: true })
  hour: Date;

  @Prop({ required: true })
  totalSales: number;

  @Prop({ required: true })
  timestamp: Date; 
}

export const HourlySalesSummarySchema = SchemaFactory.createForClass(HourlySalesSummary);
