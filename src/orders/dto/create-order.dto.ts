import { IsDate, IsDateString, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
    @IsNumber()
    userId: number;
    @IsNumber()
    productId: number;
    @IsString()
    orderDate: string;
}
