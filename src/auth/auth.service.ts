import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);

        if(user){
            // checar se a senha informada corresponde ao hash bcrypt que está no banco

            const isPasswordValid = await bcrypt.compare(password, user.password)

            if(isPasswordValid){
                return {
                    ...user,
                    password: undefined
                }
            }
        }

        throw new UnauthorizedException("User doesn't exist or password is incorrect!")
    }

    login(user: User): UserToken {
        //Usuário Já valido pelo Guardião, vamos transformar ele em um JWT

        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name
        }

        const jwtToken = this.jwtService.sign(payload);

        return {
            acess_token: jwtToken
        };
    }
}
