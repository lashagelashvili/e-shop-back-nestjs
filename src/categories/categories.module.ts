import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from 'src/schemas/categories.schema';

@Module({
  providers: [CategoriesService],
  controllers: [CategoriesController],
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
  ],
})
export class CategoriesModule {}
