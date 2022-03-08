import { Injectable } from "@nestjs/common";
import { AdmissionNotification } from "./admissionNotification.model";

@Injectable()
export class AdmissionNotificationsService {
    admissionNotifications: AdmissionNotification[] = [];

    insertAdmissionNotification(title: string, desc: string){
        const notiId = new Date().toString();
        const newNotification = new AdmissionNotification(notiId, title, desc);
        this.admissionNotifications.push(newNotification);
        return notiId;
    }
}