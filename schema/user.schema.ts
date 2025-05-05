import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document} from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  shirt: string;

  @Prop({ required: true })
  pant: string;

  @Prop({ required: true })
  shoes: string;

  @Prop({ required: true, unique: true })
  phone: number;


}

export const UserSchema = SchemaFactory.createForClass(User);