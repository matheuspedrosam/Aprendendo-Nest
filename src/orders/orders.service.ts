import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>, @InjectRepository(Product) private readonly productRepository: Repository<Product>, @InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(createOrderDto: CreateOrderDto) {

    const userExist = await this.userRepository.findOne({where: {id: createOrderDto.userId}});

    const productExist = await this.productRepository.findOne({where: {id: createOrderDto.productId}});

    if(!userExist) throw new HttpException("User Doesn't Exist", HttpStatus.NOT_FOUND);
    if(!productExist) throw new HttpException("Product Doesn't Exist", HttpStatus.NOT_FOUND);

    const order = this.orderRepository.create(createOrderDto)
    await this.orderRepository.save(order);

    return order;
  }

  async findAll() {
    const orders = await this.orderRepository.find({relations: ['user', 'product']});

    const ordersWithoutUserPassword = [];
    orders.forEach((order) => {
      order.user.password = undefined;
    });
    ordersWithoutUserPassword.push(...orders)

    return ordersWithoutUserPassword;
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({where: {id: id}});

    if(!order) throw new HttpException("Order Doesn't Exist", HttpStatus.NOT_FOUND);

    return order;
  }

  async delete(id: number) {
    const order = await this.findOne(id);

    await this.orderRepository.delete(order);

    return order;
  }
}
