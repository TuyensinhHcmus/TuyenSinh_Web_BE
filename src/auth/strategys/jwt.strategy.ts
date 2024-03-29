import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "src/users/users.model";
import { UsersService } from "src/users/users.service";
import { JwtPayload } from "../token-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private userService: UsersService
    ) {
        super({
            secretOrKey: "topSecret51",
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payload: JwtPayload): Promise<User> {
        console.log("chay jwt strategy");
        console.log(payload)
        const { userEmail } = payload;
        const user = await this.userService.getSingleUser(userEmail);
        if (!user || user.userRefreshToken === "") {
            throw new UnauthorizedException();
        }
        return { ...user, ...payload };
    }
}