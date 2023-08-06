import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop()
  icon: string;

  @Prop()
  color: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
