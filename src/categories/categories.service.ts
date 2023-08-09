import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/schemas/categories.schema';
import { ICategory } from './intefaces/category.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private categoryModel: Model<Category>,
  ) {}

  async getCategories(): Promise<ICategory[]> {
    const categories = await this.categoryModel.find();
    return categories;
  }

  async getCategoryById(id: string): Promise<ICategory> {
    const category = await this.categoryModel.findById(id);

    if (!category) {
      throw new NotFoundException(
        'The category with the given ID was not found',
      );
    }

    return category;
  }

  async createCategory(categoryBody: ICategory): Promise<ICategory> {
    let category = new this.categoryModel({
      name: categoryBody.name,
      icon: categoryBody.icon,
      color: categoryBody.color,
    });

    category = await category.save();

    if (!category) {
      throw new NotFoundException('the category cannot be created!');
    }

    return category;
  }

  async updateCategory(
    id: string,
    categoryBody: ICategory,
  ): Promise<ICategory> {
    const category = await this.categoryModel.findByIdAndUpdate(
      id,
      categoryBody,
      { new: true },
    );

    if (!category) {
      throw new NotFoundException('the category cannot be updated!');
    }

    return category;
  }

  async deleteCategory(id: string): Promise<{
    success: boolean;
    message: string;
  }> {
    return this.categoryModel
      .findByIdAndDelete(id)
      .then((category) => {
        if (category) {
          return { success: true, message: 'the category has been deleted' };
        } else {
          throw new NotFoundException('category not found');
        }
      })
      .catch((err) => {
        throw new BadRequestException({ success: false, message: err });
      });
  }
}
