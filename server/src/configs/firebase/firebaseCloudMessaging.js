const admin = require('./firebaseAdmin')

const sendNotification = async (fcmToken, title, body) => {
    const message = {
        token: fcmToken,
        notification: {
            title: title,
            body: body
        }
    };

    try {
        const response = await admin.messaging().send(message);
        console.log("Notification sent successfully:", response);
    } catch (error) {
        console.error("Error sending notification:", error);
    }
};
module.exports = sendNotification;