import { Injectable } from '@nestjs/common';
import RegisterDto from 'src/auth/dto/register.dto';
import { google } from 'googleapis';
import * as Mail from 'nodemailer/lib/mailer';
import { createReadStream } from 'fs';
import { join } from 'path';
import { createTransport } from 'nodemailer';
import * as firebase from "firebase-admin";
import { AdmissionNotificationsService } from 'src/admissionNotifications/admissionNotifications.service';
// import fs from 'fs-extra';
// import path from 'path';
const fs = require('fs-extra');
const pdf = require('html-pdf');
var Readable = require('stream').Readable


@Injectable()
export class PdfService {
  constructor(
    private serviceDb: AdmissionNotificationsService
  ) {


  }

  async getPDF(fileName: string) {
    let db = this.serviceDb.getDb();
    let ref = db.collection('streams').doc(fileName);
    let dataStream = await ref.get();

    console.log("data", dataStream.data());

    var s = new Readable();
    s.push(dataStream.data().value);
    s.push(null);

    return s;

  }

  async generatePdf() {
    let name = './tuihoso' + (new Date().getTime()).toString() + '.pdf'

    let db = this.serviceDb.getDb();

    let file = await fs
      .readFile('./src/generatePdf/templatePdf/Tui_Hs.html', 'utf8')
      .then(async (res) => {
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
          width: '635px',
          height: '820px',
        };

        //tra file truc tiep
        // const streamValue = async () => {
        //   const value = await new Promise(r => {
        //     pdf.create(strHtml, options).toStream((a, stream) => {

        //       r(stream);
        //     })
        //   })
        //   return value
        // }


        // return result
        let filename = 'tuihoso' + (new Date().getTime())

        pdf.create(strHtml, options).toBuffer(async (t, buffer) => {
          console.log('buffer', buffer);

          let ref = await db.collection('streams');

          await ref.doc(filename).set({
            value: buffer
          });
          // const snapshot = await ref.where('capital', '==', true).get();


        })

        return filename

        // pdf.create(strHtml, options).toStream(function(err, stream){
        //   stream.pipe(fs.createWriteStream(name));
        // });
      })

    return file
  }

}
