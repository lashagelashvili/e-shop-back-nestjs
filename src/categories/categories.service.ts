import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      throw new HttpException(
        'The category with the given ID was not found',
        HttpStatus.NOT_FOUND,
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
      throw new HttpException(
        'the category cannot be created!',
        HttpStatus.NOT_FOUND,
      );
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
      throw new HttpException(
        'the category cannot be updated!',
        HttpStatus.NOT_FOUND,
      );
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
          throw new HttpException(
            { success: false, message: 'category not found' },
            HttpStatus.NOT_FOUND,
          );
        }
      })
      .catch((err) => {
        throw new HttpException(
          { success: false, error: err },
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
