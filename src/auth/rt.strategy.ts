import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "src/users/users.model";
import { UsersService } from "src/users/users.service";
import { JwtPayload } from "./jwt-payload.interface";
import { Request } from "express";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(
        private userService: UsersService
    ) {
        super({
            secretOrKey: "rt-topSecret51",
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true,
        })
    }

    async validate(req: Request ,payload: any) {
        const refreshToken = req.get('authorization').replace('Bearer', '').trim();

        return {
            ...payload,
            refreshToken,
        }
        
        // return user;
    }
}