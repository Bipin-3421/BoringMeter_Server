import { ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST_CONTEXT_KEY } from './constant';

export class RequestContext {
  private readonly _request: Request;

  constructor(options: { req: Request }) {
    this._request = options.req;
  }

  get req(): Request {
    return this._request;
  }

  static empty(): RequestContext {
    return new RequestContext({ req: {} as Request });
  }

  static fromExecutionContext(context: ExecutionContext): RequestContext {
    try {
      const req: Request = context.switchToHttp().getRequest();

      // Ensure a context always exists
      if (!req[REQUEST_CONTEXT_KEY]) {
        const newCtx = new RequestContext({ req });
        Object.defineProperty(req, REQUEST_CONTEXT_KEY, {
          value: newCtx,
          enumerable: false,
          writable: false,
        });
      }

      return req[REQUEST_CONTEXT_KEY] || new RequestContext({ req });
    } catch (error) {
      console.error('Error creating RequestContext:', error);
      return RequestContext.empty();
    }
  }
}
