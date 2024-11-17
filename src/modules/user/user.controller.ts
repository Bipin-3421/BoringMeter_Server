import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Ctx } from 'common/decorator/ctx.decorator';
import { RequestContext } from 'common/request.context';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Ctx() ctx: RequestContext, @Body() body: CreateUserDTO) {
    const user = await this.userService.create(ctx, body);
    return {
      message: 'User created sucessfully',
      data: user,
    };
  }
}
