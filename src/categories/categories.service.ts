import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Category) private readonly categoriesRepository: Repository<Category>) {}

    findAll() {
        return this.categoriesRepository.find();
    }

    async findById(id: number): Promise<Category>{
        const category = await this.categoriesRepository.findOne({where: {id: id}})

        if(!category) throw new HttpException("Category Doesn't Exist", HttpStatus.NOT_FOUND);

        return category
    }
    
    async findByName(createCategoryDto: CreateCategoryDto){
        const category = await this.categoriesRepository.findOne({where: {name: createCategoryDto.name}})

        return category
    }

    async create(createCategoryDto: CreateCategoryDto) {

        const isCategoryDuplicated = await this.findByName(createCategoryDto);

        if(isCategoryDuplicated) throw new HttpException('Category Already Exists', HttpStatus.CONFLICT);

        const category = this.categoriesRepository.create(createCategoryDto);
        await this.categoriesRepository.save(category);

        return category;
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto){
        
        const newCategory = await this.categoriesRepository.preload({
            id: +id,
            ...updateCategoryDto
        })

        if(!newCategory) throw new HttpException("Category Doesn't Exist", HttpStatus.NOT_FOUND);

        try{
            await this.categoriesRepository.save(newCategory);
        } catch (error) {
            throw new HttpException('Category Name Already Exist', HttpStatus.CONFLICT);
        }
        
        return newCategory;
    }

    async delete(id: number){
        const category = await this.findById(id);

        if(!category) throw new HttpException('Category Doesnt Exist', HttpStatus.NOT_FOUND);

        try {
            await this.categoriesRepository.delete(category);
            return category;
        } catch(e){
            throw new Error('Erro ao deletar: ' + e.message);
        }

    }

}
