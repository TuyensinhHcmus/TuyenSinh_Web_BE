var admin = require("firebase-admin");

const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');


const { log } = require("console");
// Required for side-effects

var serviceAccount = require("../../../src/admissionNotifications/serviceAccountKey.json");
const { setEnvironmentData } = require("worker_threads");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();
var resgistrationToken =
    "e661DbRIRui8rZr1ltRZKU:APA91bG724m2xjiDMZFrQ0uL9LBQ36Wq3BIMj7meBF2_42osGOcVJVTlWRm18HG-hKir6qQ3zBvCzl8MgIiV3PiL2EkcyZZz21vuz_vvypW8_6skZrPJiFSxL9ex5hqm_iclgRB6lGzX";

async function sendTopicMessage(body, title, screen, id, topic) {
    var listUserId = [];
    await db.collection('topics').get().then((value) => {
        value.docs.forEach((element) => {
            if (element.id == topic) {
                listUserId.push(element.data());
            }
        })
    })
    log(listUserId);

    // Find in db where tokenDevices current in listUserId
    var tokenDevices = ['e661DbRIRui8rZr1ltRZKU:APA91bG724m2xjiDMZFrQ0uL9LBQ36Wq3BIMj7meBF2_42osGOcVJVTlWRm18HG-hKir6qQ3zBvCzl8MgIiV3PiL2EkcyZZz21vuz_vvypW8_6skZrPJiFSxL9ex5hqm_iclgRB6lGzX', 'e661DbRIRui8rZr1ltRZKU:APA91bG724m2xjiDMZFrQ0uL9LBQ36Wq3BIMj7meBF2_42osGOcVJVTlWRm18HG-hKir6qQ3zBvCzl8MgIiV3PiL2EkcyZZz21vuz_vvypW8_6skZrPJiFSxL9ex5hqm_iclgRB6lGzX'];

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
        tokens: tokenDevices // Here is devices token need to send
    };

    log(tokenDevices)

    // Send message
    if (tokenDevices.length != 0) {
        admin.messaging().sendMulticast(DATA)
            .then((response) => {
                console.log('Success sent message: ' + response);
            })
            .catch((err) => {
                console.log('Error sending message: ' + err);
            });
    }

}
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

sendTopicMessage('body', 'title', 'scree', '123', '5');