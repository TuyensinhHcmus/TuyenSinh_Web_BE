import { Injectable } from "@nestjs/common";
import RegisterDto from "src/auth/dto/register.dto";
import { google } from 'googleapis';
import * as Mail from 'nodemailer/lib/mailer';
import { createTransport } from "nodemailer";
import { access } from "fs";
//import { MailerModule, MailerService, MailerTransportFactory } from "@nestjs-modules/mailer";



@Injectable()
export class MailService {
    private nodemailerTransport: Mail;
    // private mailerService: MailerService;
    // private mailerTransport: MailerTransportFactory;
    private oAuth2Client;
    constructor(

    ) {
        this.oAuth2Client = new google.auth.OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            process.env.REDIRECT_URI
        )

        this.oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
    }

    async sendUserConfirmation(user: RegisterDto, token: string) {
        await this.oAuth2Client.refreshAccessToken;
        const accessToken = await this.oAuth2Client.getAccessToken();

        this.nodemailerTransport = createTransport({
            host: process.env.MAIL_HOST,
            secure: false,
            auth: {
                type: 'OAuth2',
                user: process.env.MAIL_USER,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });
        

        const res = await this.nodemailerTransport.sendMail({
            from: process.env.MAIL_USER,
            to: user.userEmail,
            subject: "MÃ XÁC NHẬN EMAIL",

            //template: 'confirmation',
            html: "<b>Mã xác nhận của bạn là: </b>" + token
        });

        //console.log(res);
    }
}