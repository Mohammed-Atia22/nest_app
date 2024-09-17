/* eslint-disable prettier/prettier */
import { Body, Controller,Delete,Get, Param,Patch,Post, Query,ParseIntPipe,ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './DTO/create-user.dto';
import { UpdateUserDto } from './DTO/update-user.dto';
//import { retry } from 'rxjs';
//import { Get } from 'http';

@Controller('users')
export class UsersController {

    constructor(private readonly userService:UsersService){}

    @Get()
    findAll(@Query('role') role?:'INTERN'|'ENGINEER'|'ADMIN'){
        return this.userService.findAll(role);
    }

    @Get(':id')
    findOne(@Param('id',ParseIntPipe) id:number){
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body(ValidationPipe) creteuserdto:CreateUserDto){
        return this.userService.create(creteuserdto);
    }

    @Patch(':id')
    update(@Param('id',ParseIntPipe) id:number,@Body(ValidationPipe) updateuserdto:UpdateUserDto){
        return this.userService.update(id,updateuserdto);
    }

    @Delete(':id')
    deleteOne(@Param('id',ParseIntPipe) id:number){
        return this.userService.delete(id);
    }

}



/*
    nest g module users
    nest g controller users
    nest g service users
*/
