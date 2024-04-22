import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";

@Controller('users')
export class UsersController{
    private userService: UsersService;

    constructor(userService: UsersService){
        this.userService = userService;
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto){
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll(){
        return this.userService.findAll();
    }

}