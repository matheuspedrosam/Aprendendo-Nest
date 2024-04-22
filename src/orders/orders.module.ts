import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductsModule } from 'src/products/products.module';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, User]), ProductsModule, UsersModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
