import { ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST_CONTEXT_KEY } from './constants';

export class RequestContext {
  private readonly _request: Request;

  constructor(options: { req: Request }) {
    this._request = options.req;
  }

  get req(): Request {
    return this._request;
  }

  static empty() {
    return new RequestContext({ req: {} as Request });
  }

  static fromExecutionContext(context: ExecutionContext): RequestContext {
    const req: Request = context.switchToHttp().getRequest();

    if (req[REQUEST_CONTEXT_KEY]) {
      return req[REQUEST_CONTEXT_KEY];
    } else {
      const newCtx = new RequestContext({ req });
      (req as any)[REQUEST_CONTEXT_KEY] = newCtx;

      return newCtx;
    }
  }
}
