importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyD7Z9uWY9vHpu96UNWoSVJ__TPOTlEzPsc",
  authDomain: "jobhuntly-a8600.firebaseapp.com",
  projectId: "jobhuntly-a8600",
  storageBucket: "jobhuntly-a8600.appspot.com",
  messagingSenderId: "253694401623",
  appId: "1:253694401623:web:94fbc4167b0853a5fcd712",
  measurementId: "G-3M2MC2W4QS"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("[firebase-messaging-sw.js] Received background message ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
