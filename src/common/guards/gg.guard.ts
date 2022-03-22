import {AuthGuard} from '@nestjs/passport'

export class GgGuard extends AuthGuard('google') {
    constructor(){
        super()
    }
}