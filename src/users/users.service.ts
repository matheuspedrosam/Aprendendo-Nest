import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "./dtos/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";


@Injectable()
export class UsersService{

    constructor(@InjectRepository(User) private readonly userRepository:Repository<User>) { }
    
    async create(createUserDto: CreateUserDto){
        let userAlreadyExist = await this.findByEmail(createUserDto.email)
        
        if(userAlreadyExist) throw new HttpException('User Already Exists', HttpStatus.CONFLICT);

        const user = {
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10)
        }
        
        let userCreated = this.userRepository.create(user);
        userCreated = await this.userRepository.save(user);

        return {
            ...userCreated,
            password: undefined
        }
    }
    
    async findAll(){
        const users = await this.userRepository.find();
        
        users.forEach(user => user.password = undefined)
        
        return users;
    }

    async findByEmail(email: string){
        const user = await this.userRepository.findOne({
            where: { email }
        })

        if(!user) return null;

        return user;
    }

}