import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Dto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService, 
        private jwt: JwtService,
        private config: ConfigService
    ) {}

    async signup(
            dto: Dto,
            res: Response
        ) {
        const { email, password } = dto;
        
        // generate the password hash
        const hash = await argon.hash(password)
        // save the new user in the db
        try {
            const user = await this.prisma.user.create({
                data: {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
                    email,
                    password: hash,
                },
            });
            
            return res.send({
                message: 'Account created succefully'
            });

        } catch (error) {
            if (error instanceof 
                PrismaClientKnownRequestError
            ) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(
                        'Email already exist!'
                    );
                }
            }
            throw error;
        }
        
    }

    async signin(
            dto: Dto,  
            res: Response
        ) {
        const { email, password } = dto;
        // find user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            }
        });
        // if user does not exist throw exception
        if (!user)
            throw new ForbiddenException(
                'Incorrect email or password'
        );
        // compare password
        const pwMatches = await argon.verify(
                user.password, 
                password,
            );
        // if password is incorrect throw exception
        if (!pwMatches) 
            throw new ForbiddenException(
                'Incorrect email or password'
        );
        
        const token = await this.signToken(user.id, user.email);
        // send back the user signin token
        res.cookie('token', token.access_token)
        return res.send({
            message: 'Signed in succefully',
            token: token.access_token,
            user
        });
    }

    async signout(req: Request, res: Response) {
        res.clearCookie('token')
        return  res.send({message: 'Signed out succefully'});
    }

    async signToken(
        userId: string, 
        email: string
    ): Promise<{access_token: string}> {
        const payload = {
            id: userId,
            email,
        }
        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(
            payload, 
            {
                expiresIn: '2d',
                secret: secret,
            },
        );

        return {
            access_token: token,
        };
    }
}
