import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { CategoriesModule } from "src/categories/categories.module";
import { Category } from "src/categories/entities/category.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Product, Category]), CategoriesModule],
    controllers: [ProductsController],
    providers: [ProductsService],
    exports: [ProductsService]
})
export class ProductsModule {}