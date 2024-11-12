import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { catchError, concatMap, Observable } from 'rxjs';
import { ENTITY_MANAGER_KEY } from 'src/common/constants';
import { DataSource } from 'typeorm';

export class TransactionInterceptor implements NestInterceptor {
  constructor(@InjectDataSource() private dataSource: DataSource) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    req[ENTITY_MANAGER_KEY] = queryRunner.manager;

    return next.handle().pipe(
      concatMap(async (response) => {
        await queryRunner.commitTransaction();

        return response;
      }),
      catchError(async (error) => {
        await queryRunner.rollbackTransaction();
        throw error;
      }),
    );
  }
}
