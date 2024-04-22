import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";
import { Category } from "src/categories/entities/category.entity";

@Injectable()
export class ProductsService{

    constructor( @InjectRepository(Product) private readonly productsRepository: Repository<Product>, @InjectRepository(Category) private readonly categoriesRepository: Repository<Category>){ }

    async create(createProductDto: CreateProductDto){
        const isCategoryValid = await this.categoriesRepository.findOne({
            where: {id: createProductDto.categoryId}
        })

        if(!isCategoryValid) throw new HttpException('Categoria Não Encontrada', HttpStatus.NOT_FOUND)

        const product = this.productsRepository.create(createProductDto);
        return this.productsRepository.save(product);
    }

    findAll(){
        return this.productsRepository.find({
            relations: ['category']
        });
    }

    async findOne(id: number){
        const product = await this.productsRepository.findOne({where: {id: +id}, relations: ['category']});

        if(!product) throw new NotFoundException("Produto Não Existe");

        return product;
    }
    
    async fullUpdate(id: number, createProductDto: CreateProductDto){
        const product = await this.productsRepository.preload({
            id: +id,
            ...createProductDto
        })

        if(!product) throw new NotFoundException('Produto Não Existe');

        const isCategoryValid = await this.categoriesRepository.findOne({
            where: {id: createProductDto.categoryId}
        })

        if(!isCategoryValid) throw new HttpException('Categoria Não Encontrada', HttpStatus.NOT_FOUND)

        return this.productsRepository.save(product);
    }

    async parcialUpdate(id: number, updateProductDto: UpdateProductDto) {
        const product = await this.productsRepository.preload({
            id: +id,
            ...updateProductDto
        })

        if(!product) throw new NotFoundException('Produto Não Existe');

        const isCategoryValid = await this.categoriesRepository.findOne({
            where: {id: updateProductDto.categoryId}
        })

        if(!isCategoryValid) throw new HttpException('Categoria Não Encontrada', HttpStatus.NOT_FOUND)

        return this.productsRepository.save(product);
    }

    async delete(productId: number){
        const product = await this.findOne(productId);

        return this.productsRepository.remove(product);
    }
}