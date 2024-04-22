import { Product } from "src/products/entities/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique: true})
    name: string;
    @OneToMany(() => Product, (product) => product.categoryId)
    products: Product[];
}