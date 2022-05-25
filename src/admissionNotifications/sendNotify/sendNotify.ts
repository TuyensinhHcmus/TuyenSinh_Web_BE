var admin = require("firebase-admin");

//var serviceAccount = require("D:/HỌC TẬP/NĂM 4/HK2/Đồ án tốt nghiệp/TuyenSinh_Web_BE/src/admissionNotifications/sendNotify/serviceAccountKey.json");
var serviceAccount = require("./serviceAccountKey.json")
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
var resgistrationToken = 'e661DbRIRui8rZr1ltRZKU:APA91bG724m2xjiDMZFrQ0uL9LBQ36Wq3BIMj7meBF2_42osGOcVJVTlWRm18HG-hKir6qQ3zBvCzl8MgIiV3PiL2EkcyZZz21vuz_vvypW8_6skZrPJiFSxL9ex5hqm_iclgRB6lGzX';
var db = admin.firestore();

async function start() {
    var topics = [];
    const col = await db.collection('topics').get();
    col.forEach((doc) => {
        topics.push(doc.id);
    })

    var message = {
        data: {
            title: '100',
            body: '2:45',
            route: 'news',
            id: '1-thong-bao-ve-viec-nop-ho-so-xac-nhan-nhap-hoc-va-nhap-hoc-doi-voi-thi-sinh-trung-tuyen-dai-hoc-he-chinh-quy-nam-2021-nhung-chua-nhan-duoc-giay-chung-nhan-ket-qua-thi-tn-thpt-nam-2021'
        },
        //token: resgistrationToken
    };

    admin.messaging().sendToDevice(topics, message)
        .then((response) => {
            console.log('Success sent message: ' + response);
        })
        .catch((err) => {
            console.log('Error sending message: ' + err);
        });
}


// Send message to device
var DATA = {
    notification: {
        body: "this is a body",
        title: "this is a title",
    },
    data: {
        click_action: "FLUTTER_NOTIFICATION_CLICK",
        sound: "default",
        status: "done",
        id: '1-thong-bao-ve-viec-nop-ho-so-xac-nhan-nhap-hoc-va-nhap-hoc-doi-voi-thi-sinh-trung-tuyen-dai-hoc-he-chinh-quy-nam-2021-nhung-chua-nhan-duoc-giay-chung-nhan-ket-qua-thi-tn-thpt-nam-2021',
        //id: "1",
        screen: "news",
    },
    token: resgistrationToken
};

admin.messaging().send(DATA)
    .then((response) => {
        console.log('Success sent message: ' + response);
    })
    .catch((err) => {
        console.log('Error sending message: ' + err);
    });


// Send message to events
// var DATA = {
//     notification: {
//         body: "this is a body",
//         title: "this is a title",
//     },
//     data: {
//         click_action: "FLUTTER_NOTIFICATION_CLICK",
//         sound: "default",
//         status: "done",
//         //id: '1-thong-bao-ve-viec-nop-ho-so-xac-nhan-nhap-hoc-va-nhap-hoc-doi-voi-thi-sinh-trung-tuyen-dai-hoc-he-chinh-quy-nam-2021-nhung-chua-nhan-duoc-giay-chung-nhan-ket-qua-thi-tn-thpt-nam-2021',
//         id: "3",
//         screen: "events",
//     },
//     token: resgistrationToken
// };

// admin.messaging().sendToTopic('3', DATA)
//     .then((response) => {
//         console.log('Success sent message: ' + response);
//     })
//     .catch((err) => {
//         console.log('Error sending message: ' + err);
//     });