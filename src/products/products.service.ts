import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductsService{

    constructor( @InjectRepository(Product) private readonly productsRepository: Repository<Product> ){ }

    getProducts(){
        return this.productsRepository.find();
    }

    async getProductById(id: number){
        const product = await this.productsRepository.findOne({where: {id: +id}});
        if(!product){
            throw new NotFoundException("Produto Não Existe");
        }
        return product;
    }
    
    setProduct(createProductDto: CreateProductDto): object{
        const product = this.productsRepository.create(createProductDto);
        return this.productsRepository.save(product);
    }

    async updateProduct(id: number, updateProductDto: UpdateProductDto) {
        const product = await this.productsRepository.preload({
            id: +id,
            ...updateProductDto
        })

        if(!product) {
            throw new NotFoundException('Produto Não Existe');
        }

        return this.productsRepository.save(product);
    }

    async deleteProduct(productId: number){
        const product = await this.getProductById(productId);

        return this.productsRepository.remove(product);
    }
}