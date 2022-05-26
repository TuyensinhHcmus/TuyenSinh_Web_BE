import { Injectable } from '@nestjs/common';
import RegisterDto from 'src/auth/dto/register.dto';
import { google } from 'googleapis';
import * as Mail from 'nodemailer/lib/mailer';
import { createTransport } from 'nodemailer';
// import fs from 'fs-extra';
// import path from 'path';
const fs = require('fs-extra');
const pdf = require('html-pdf');

@Injectable()
export class PdfService {
  async generatePdf() {
    await fs
      .readFile('./src/generatePdf/templatePdf/Tui_Hs.html', 'utf8')
      .then((res) => {
        let strHtml = res?.slice(0);

        const data = {
          name: 'Nguyễn Tấn Đạt',
          phone: '011010131',
          address: 'Bình SƠn, QUảng Ngãi',
          address2: 'TP HCM',
          birthday: '25/08/2000',
          birthplace: 'Quảng Ngãi',
          gender: 'Nam',
          code: 'AMc/1203/201/213',
          email: 'datnguyen25082000@gmail.com',
        };

        Object.keys(data).forEach(function (key) {
          const temp = `[pdf__${key}]`;

          if (strHtml?.includes(temp)) {
            strHtml = strHtml.replace(temp, data[key]);
          }
        });

        const options = {
          // tuihs - khong border
          width: '635px',
          height: '820px',

          // so yeu ly lich
          // width: '600px',
          // height: '800px',
          // border: {
          //   top: '40px',
          //   right: '20px',
          //   bottom: '50px',
          //   left: '20px',
          // },

          // phieu dky
          // width: '635px',
          // height: '820px',
          // border: {
          //   top: '40px',
          //   bottom: '60px',
          // },
        };

        pdf.create(strHtml, options).toFile('./pdfname.pdf', (err, res) => {
          fs.writeFile('fileName.pdf', res);
        });
      });
  }
}
