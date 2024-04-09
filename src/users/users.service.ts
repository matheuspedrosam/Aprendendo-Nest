import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { CreateUserDto } from "./dtos/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";


@Injectable()
export class UsersService{

    constructor(@InjectRepository(User) private readonly userRepository:Repository<User>) { }

    getUsers(){
        return this.userRepository.find();
    }

    async getUserById(id:number){
        const user = await this.userRepository.findOne({where: {id: +id}})

        if(!user){
            throw new NotFoundException('User não Existe');
        }

        return user;
    }

    setUser(createUserDto:CreateUserDto){
        const user = this.userRepository.create(createUserDto);

        return this.userRepository.save(user);
    }

    async updateUser(id:number, updateUserDto:UpdateUserDto){
        const user = await this.userRepository.preload({
            id: +id,
            ...updateUserDto
        })

        if(!user){
            throw new NotFoundException("Usuário Não Existe")
        }

        return this.userRepository.save(user);
    }

    async deleteUser(id:number){
        const user = await this.getUserById(id);

        return this.userRepository.remove(user);
    }

}