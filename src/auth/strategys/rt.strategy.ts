import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import * as bcrypt from 'bcrypt'
import { UsersService } from "src/users/users.service";
import { RtPayload } from "../token-payload.interface";
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

    async validate(req: Request ,payload: RtPayload) {
        console.log('chay rt strategy');
        
        const refreshToken = req.get('authorization').replace('Bearer', '').trim();

        const user = await this.userService.getSingleUser(payload.userEmail);
        
        if(!user)
        {
            throw new ForbiddenException('Access denied 1')
        }
        
        // console.log('res', user);
        // const salt = await bcrypt.genSalt(10);
        // let hash =  await bcrypt.hash(refreshToken, salt);
        // console.log('refreshtoken', refreshToken);
        // console.log("hash", hash);
        
        // const temp = await bcrypt.compare(refreshToken, user.refreshToken)

        // const temp = await bcrypt.compare("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjM0YjQwOTU1ZDZlZjIxMDNhZmYwZDIiLCJ1c2VyRW1haWwiOiJxdW9jbHVvbmcyNTAzc3BhbUBnbWFpbC5jb20iLCJpYXQiOjE2NDc2NzA3NjEsImV4cCI6MTY0ODI3NTU2MX0.9_MY4fknvBGGTMD5hcyqVGPiiZ_CFPIDf5gntRIZM7", hash)
        // const temp = await bcrypt.compare('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjM0YjQwOTU1ZDZlZjIxMDNhZmYwZDIiLCJ1c2VyRW1haWwiOiJxdW9jbHVvbmcyNTAzc3BhbUBnbWFpbC5jb20iLCJpYXQiOjE2NDc2NjQwNjEsImV4cCI6MTY0ODI2ODg2MX0.ehqWuzMAbQtBKpfWGLhtToOnwnMjSP7yBfYeZ8Tz7q0', '$2b$10$2FpMMLCy5bQSsoxqfK2jp.88efV5hvu0ILXCnlwkuezPJQPbcGFb6')
        // console.log("temp 1", temp);
        // const temp2 = await bcrypt.compare('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjM0YjQwOTU1ZDZlZjIxMDNhZmYwZDIiLCJ1c2VyRW1haWwiOiJxdW9jbHVvbmcyNTAzc3BhbUBnbWFpbC5jb20iLCJpYXQiOjE2NDc2NjQwNjEsImV4cCI6MTY0ODI2ODg2MX0.ehqWuzMAbQtBKpfWGLhtToOnwnMjSP7yBfYeZ8Tz7q0', '$2b$10$v0a2/vIm4z8oYAkMIszlieDRPK0nnDKS4LR05ajKMW/gdH4GPIo.u')
        // console.log("temp 2", temp2);
        
        const isMatch = await bcrypt.compare(refreshToken, user.refreshToken)
        
        if(!isMatch)
        {
            throw new ForbiddenException('Access denied2')
        }
        return {...user, ...payload}
        
        // return user;
    }
}