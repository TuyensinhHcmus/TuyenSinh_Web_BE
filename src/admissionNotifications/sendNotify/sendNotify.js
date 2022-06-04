var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json")
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();


async function sendToDirectDevice(body, title, screen, id, tokenDevice) {
    // Set up message
    var DATA = {
        notification: {
            body: body,
            title: title,
        },
        data: {
            click_action: "FLUTTER_NOTIFICATION_CLICK",
            sound: "default",
            status: "done",
            id: id,
            screen: screen,
        },
        token: tokenDevice // Here is device token need to send
    };

    // Send message
    admin.messaging().send(DATA)
        .then((response) => {
            console.log('Success sent message: ' + response);
        })
        .catch((err) => {
            console.log('Error sending message: ' + err);
        });

}

async function sendTopicMessage(body, title, screen, id, topic) {
    var listUserId = [];
    await db.collection('topics').get().then((value) => {
        value.docs.forEach((element) => {
            if (element.id == topic){
                listUserId = element.data().keys.toList();
            }
        })
    })
    // Find in db where tokenDevices current in listUserId
    var tokenDevices = [];


    // Set up message
    var DATA = {
        notification: {
            body: body,
            title: title,
        },
        data: {
            click_action: "FLUTTER_NOTIFICATION_CLICK",
            sound: "default",
            status: "done",
            id: id,
            screen: screen,
        },
        token: tokenDevices // Here is devices token need to send
    };

    // Send message
    admin.messaging().send(DATA)
        .then((response) => {
            console.log('Success sent message: ' + response);
        })
        .catch((err) => {
            console.log('Error sending message: ' + err);
        });

}
