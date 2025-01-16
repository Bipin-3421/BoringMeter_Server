import {
  Controller,
  Post,
  Body,
  NotFoundException,
  Get,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Ctx } from '@common/decorator/ctx.decorator';
import { RequestContext } from '@common/request.context';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { Public } from '@common/decorator/public.decorator';
import { LoginUserDTO } from './dto/login-user.dto';
import { PermissionAction, PermissionResource } from 'types/permission';
import { Require } from '@common/decorator/require.decorator';
import { UserParamDTO } from './dto/param.dto';

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
      data: {
        id: user.id,
        name: user.name,
        createdAt: user.createdAt,
        email: user.email,
        password: user.password,
        phoneNumber: user.phoneNumber,
      },
    };
  }

  @Get()
  @Require({
    permission: PermissionResource.USER,
    action: PermissionAction.VIEW,
  })
  async getUsers(@Ctx() ctx: RequestContext) {
    const users = await this.userService.findMany(ctx);
    return {
      data: users,
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
      data: {
        accessToken: data.accessToken,
      },
    };
  }

  @Get('active')
  @Require({
    permission: PermissionResource.USER,
    action: PermissionAction.VIEW,
  })
  async activeUser(@Ctx() ctx: RequestContext) {
    const userId = ctx.data?.userId;
    const user = await this.userService.activeUser(ctx, String(userId));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      data: {
        id: user.id,
        createdAt: user.createdAt,
        email: user.email,
        password: user.password,
        phoneNumber: user.phoneNumber,
      },
    };
  }

  @Delete(':userId')
  @Require({
    permission: PermissionResource.MOVIE,
    action: PermissionAction.Edit,
  })
  async deleteUser(@Ctx() ctx: RequestContext, @Query() param: UserParamDTO) {
    const user = await this.userService.delete(ctx, param.userId);

    return {
      message: 'User deleted successfully',
    };
  }
}
