import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY, REQUIRED_PERMISSION_KEY } from '@common/constant';
import { RequirePermission } from '@common/decorator/require.decorator';
import { RequestContext } from '@common/request.context';
import { AppConfig } from '@config/configuration';
import { Request } from 'express';
import { AuthPayload } from 'types/jwt';
import { PermissionResource, RoleToPermissionArray } from 'types/permission';
import { verifyToken } from 'utils/jwt.utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService<AppConfig, true>,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { isPublic, requiredPermissions } = this.getHandlerInfo(context);

    const token = this.extractTokenFromHeader(request);

    const payload: AuthPayload | null = token
      ? verifyToken<AuthPayload>(
          token,
          this.configService.get('jwt.jwtSecret', { infer: true }) ?? '',
        )
      : null;

    const ctx = RequestContext.fromExecutionContext(
      context,
      payload ?? undefined,
    );

    if (isPublic) {
      return true;
    } else if (!ctx.data) {
      throw new UnauthorizedException('Token not found');
    }

    request['user'] = ctx.data;

    const userPermission = RoleToPermissionArray[ctx.data.role];

    if (requiredPermissions) {
      for (const requiredPermission of requiredPermissions) {
        const foundPermission = userPermission.find((permission) => {
          if (
            permission.resource === PermissionResource.ALL ||
            (permission.resource === requiredPermission.permission &&
              permission.action.includes(requiredPermission.action))
          ) {
            return true;
          }
        });

        if (foundPermission === undefined) {
          return false;
        }
      }
    }

    return true;
  }

  private getHandlerInfo(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean | undefined>(
      IS_PUBLIC_KEY,
      context.getHandler() || context.getClass(),
    );
    const requiredPermissions = this.reflector.get<
      RequirePermission[] | undefined
    >(REQUIRED_PERMISSION_KEY, context.getHandler());

    return {
      isPublic,
      requiredPermissions,
    };
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
