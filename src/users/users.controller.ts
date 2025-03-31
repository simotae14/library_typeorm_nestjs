import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Post()
  createUser(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    return this.usersService.create(email, password);
  }
}
