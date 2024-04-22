import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";

@Controller('products')
export class ProductsController{
    private readonly productService: ProductsService;

    constructor(productService: ProductsService){
        this.productService = productService;
    }

    @Post()
    create(@Body() createProductDto:CreateProductDto){
        return this.productService.create(createProductDto);
    }

    @Get()
    findAll(){
        return this.productService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id:number){
        return this.productService.findOne(id);
    }

    // Coloquei o Put nessa rota de products porque deve conter pelo menos 1 rota com os 5 Verbos!
    @Put(':id')
    fullUpdate(@Param('id') id:number, @Body() createProductDto:CreateProductDto){
        return this.productService.fullUpdate(id, createProductDto);
    }

    @Patch(':id')
    update(@Param('id') id:number, @Body() updateProductDto:UpdateProductDto){
        return this.productService.parcialUpdate(id, updateProductDto)
    }

    @Delete(':id')
    delete(@Param('id') id:number){
        return this.productService.delete(id);
    }

}