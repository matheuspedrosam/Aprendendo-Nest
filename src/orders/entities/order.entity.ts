import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    userId: number;
    @Column()
    productId: number;
    @Column()
    orderDate: string;

    @ManyToOne(() => User, (user) => user.order)
    @JoinColumn({ name: 'userId', referencedColumnName: 'id'})
    user: User;
    @ManyToOne(() => Product, (product) => product.order)
    @JoinColumn({ name: 'productId', referencedColumnName: 'id'})
    product: Product;
}
