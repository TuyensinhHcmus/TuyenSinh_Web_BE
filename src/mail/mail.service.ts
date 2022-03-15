import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { dir } from "console";
import RegisterDto from "src/auth/dto/register.dto";

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendUserConfirmation(user: RegisterDto, token: string) {
        console.log(__dirname);

        const res = await this.mailerService.sendMail({
            to: user.userEmail,
            subject: "MÃ XÁC NHẬN EMAIL",
            template: 'confirmation',
            context:{
                name: user.userName,
                token: token
            },
        });

        console.log(res);
    }
}