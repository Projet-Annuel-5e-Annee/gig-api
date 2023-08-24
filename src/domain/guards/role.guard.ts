import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserService } from "../../usecase/user/user.service";
import { AuthService } from "../../usecase/auth/auth.service";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>("role", context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.authService.decodeToken(request.headers.authorization.split(" ")[1]) as { id: string };
    if (!token) {
      return false;
    }
    const userEntity = await this.userService.findOne({ id: token.id });
    if (!userEntity) {
      return false;
    }
    return roles.includes(userEntity.role);
  }
}
