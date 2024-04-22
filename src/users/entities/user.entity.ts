import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique: true})
    email: string;
    @Column()
    password: string;
    @Column()
    name: string;

    @OneToMany(() => Order, (order) => order.id)
    order: Order[];
}