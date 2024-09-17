/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './DTO/create-user.dto';
import { UpdateUserDto } from './DTO/update-user.dto';
import { NotFoundException } from '@nestjs/common';
//import { retry } from 'rxjs';

@Injectable()
export class UsersService {
    private users= [
        {
            "id":1,
            "name":"mohamed",
            "email":"mohamed@gmail.com",
            "role":"INTERN"
        },
        {
            "id":2,
            "name":"ahmed",
            "email":"ahmed@gmail.com",
            "role":"INTERN"
        },
        {
            "id":3,
            "name":"hamada",
            "email":"hamada@gmail.com",
            "role":"INTERN"
        },
        {
            "id":4,
            "name":"sameh",
            "email":"sameh@gmail.com",
            "role":"ENGINEER"
        },
        {
            "id":5,
            "name":"wael",
            "email":"wael@gmail.com",
            "role":"ADMIN"
        }
    ]

    findAll(role?:'INTERN'|'ENGINEER'|'ADMIN'){
        if(role){
            const rolesarray = this.users.filter(user => user.role === role);
            if(rolesarray.length === 0) throw new NotFoundException('user role not found')
            return rolesarray
        }
        return this.users;
    }
    findOne(id:number){
        const user = this.users.find(user => user.id === id);
        if(!user) throw new NotFoundException('user not found');
        return user
    }
    create(createuserdto:CreateUserDto){
        const userByHeighestId = [...this.users].sort((a,b) => b.id - a.id);
        const newUser = { id:userByHeighestId[0].id + 1 , ...createuserdto };
        this.users.push(newUser)
        return newUser
    }
    update(id:number,updateuserdto:UpdateUserDto){
        this.users = this.users.map(user => {
            if(user.id === id){
                return{...user,...updateuserdto}
            }
            return user
        })
        return this.findOne(id)
    }
    delete(id:number){
        const removedUser = this.findOne(id);
        this.users = this.users.filter(user => user.id !== id)
        return removedUser
    }
    
}
