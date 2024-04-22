import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    readonly name: string;
}