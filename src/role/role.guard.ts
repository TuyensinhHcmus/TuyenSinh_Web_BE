import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!roles) {
            return false;
        }

        const request = context.switchToHttp().getRequest();
        let user;

        if(request.user.user=== undefined)
        {
            user = request.user
        }
        else
        {
            user = request.user.user;
        }
        

        const checkRole = roles.includes(user.userRole);

        if (checkRole === false) {
            throw new HttpException('Tính năng này không dành cho ' + user.userRole, HttpStatus.FORBIDDEN);
        }

        return checkRole;
    }
}