import { Category } from "src/categories/entities/category.entity";
import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    price: number;
    @Column()
    categoryId: number;

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'categoryId', referencedColumnName: 'id'})
    category: Category;

    @OneToMany(() => Order, (order) => order.id)
    order: Order[];
}