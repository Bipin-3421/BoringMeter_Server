import { Controller, Body, Get, Post } from '@nestjs/common';
import { Ctx } from 'common/decorator/ctx.decorator';
import { RequestContext } from 'common/request.context';
import { CreateTestDTO } from './test.dto';
import { TestService } from './test.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('test')
@ApiTags('Test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  async createTest(@Ctx() ctx: RequestContext, @Body() body: CreateTestDTO) {
    console.log('ctx in controller', ctx);
    const test = await this.testService.create(ctx, body);

    return { test };
  }
}
