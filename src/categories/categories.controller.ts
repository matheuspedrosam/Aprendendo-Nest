import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Controller('categories')
export class CategoriesController {

    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto){
        return this.categoriesService.create(createCategoryDto);
    }

    @Get()
    findAll(){
        return this.categoriesService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: number){
        return this.categoriesService.findById(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto){
        return this.categoriesService.update(id, updateCategoryDto);
    }

    @Delete(':id')
    delete(@Param('id') id: number){
        return this.categoriesService.delete(id);
    }

}
