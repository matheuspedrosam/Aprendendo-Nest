import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '@Matheus130902',
      database: 'ecommerce',
      autoLoadEntities: true,
      synchronize: true, //Desabilitar em produção
    }),
    ProductsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
