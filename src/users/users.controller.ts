import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";

@Controller('users')
export class UsersController{
    private userService: UsersService;

    constructor(userService: UsersService){
        this.userService = userService;
    }

    @Get()
    findAll(){
        return this.userService.getUsers();
    }

    @Get(':id')
    findOne(@Param('id') id:number){
        return this.userService.getUserById(id);
    }

    @Post()
    create(@Body() createUserDto:CreateUserDto){
        return this.userService.setUser(createUserDto);
    }

    @Patch(':id')
    update(@Param('id') id:number, @Body() updateUsertDto:UpdateUserDto){
        return this.userService.updateUser(id, updateUsertDto);
    }
    
    @Delete(':id')
    delete(@Param('id') id:number){
        return this.userService.deleteUser(id);
    }

}