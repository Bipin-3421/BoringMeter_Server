import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Ctx } from 'common/decorator/ctx.decorator';
import { RequestContext } from 'common/request.context';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { Public } from 'common/decorator/public.decorator';
import { LoginUserDTO } from './dto/login-user.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  async create(@Ctx() ctx: RequestContext, @Body() body: CreateUserDTO) {
    const user = await this.userService.create(ctx, body);
    return {
      message: 'User created sucessfully',
      data: user,
    };
  }

  @Post('login')
  @Public()
  async login(@Ctx() ctx: RequestContext, @Body() body: LoginUserDTO) {
    const data = await this.userService.login(ctx, body);
    if (!data?.user) {
      throw new NotFoundException('User not found');
    }
    return {
      accessToken: data.accessToken,
    };
  }
}
