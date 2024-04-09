import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";

@Controller('products')
export class ProductsController{
    private readonly productService: ProductsService;

    constructor(productService: ProductsService){
        this.productService = productService;
    }

    @Get()
    findAll(){
        return this.productService.getProducts();
    }

    @Get(':id')
    findOne(@Param('id') id:number){
        return this.productService.getProductById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createProductDto:CreateProductDto){
        return this.productService.setProduct(createProductDto);
    }

    @Patch(':id')
    // @HttpCode(HttpStatus.ACCEPTED)
    update(@Param('id') id:number, @Body() updateProductDto:UpdateProductDto){
        return this.productService.updateProduct(id, updateProductDto)
    }

    @Delete(':id')
    delete(@Param('id') id:number){
        return this.productService.deleteProduct(id);
    }

}