import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RequestContext } from './request.context';

@Injectable()
export class RequestContextInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 1. Get the HTTP request object from the execution context
    const req = context.switchToHttp().getRequest();

    // 2. Create a RequestContext instance from the execution context
    const requestContext = RequestContext.fromExecutionContext(context);

    // 3. Attach the context directly to the request object
    req.requestContext = requestContext;

    // 4. Continue with the request processing
    return next.handle();
  }
}
