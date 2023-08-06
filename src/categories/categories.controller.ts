import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';
import { ICategory } from './intefaces/category.interface';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Get(':id')
  categoryById(@Param('id') id: string): Promise<ICategory> {
    return this.categoriesService.getCategoryById(id);
  }

  @Post()
  createCategory(@Body() category: CategoryDto) {
    return this.categoriesService.createCategory(category);
  }

  @Post(':id')
  updateCategory(@Param('id') id: string, @Body() category: CategoryDto) {
    return this.categoriesService.updateCategory(id, category);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id);
  }
}
