import { Injectable } from '@nestjs/common';
import { RequestContext } from 'common/request.context';
import { CreateTestDTO } from './test.dto';
import { Test } from 'common/entities/test.entity';
import { TransactionalConnection } from 'modules/connecion/connection.service';

@Injectable()
export class TestService {
  constructor(private readonly connection: TransactionalConnection) {}
  async create(ctx: RequestContext, details: CreateTestDTO) {
    try {
      console.log('ctx in service', ctx);
      const testMemo = this.connection.getRepository(ctx, Test);

      const test = testMemo.create({
        name: details.name,
        email: details.email,
      });

      return await testMemo.save(test);
    } catch (err) {
      console.log('error while creating test', err.message, err.stack);
      return err;
    }
  }
}
