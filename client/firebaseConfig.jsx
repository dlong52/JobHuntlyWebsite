import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import {
  deleteToken,
  getMessaging,
  getToken,
  onMessage,
} from "firebase/messaging";
import { pushFcmToken } from "./src/services/UserServices";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const messaging = getMessaging(app);

navigator.serviceWorker
  .register("/firebase-messaging-sw.js")
  .then((registration) => {
    // console.log("Service Worker registered successfully:", registration);
    messaging.onBackgroundMessage = (payload) => {
      console.log("Received background message: ", payload);
    };
  })
  .catch((error) => {
    console.error("Failed to register Service Worker:", error);
  });

// Request FCM token
export const requestForToken = async (email) => {
  console.log("Requesting User Permission......");
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // console.log("Notification User Permission Granted.");
      const currentToken = await getToken(messaging, {
        vapidKey:
          "BK0M4oRUvsaTJKO16tJ0szj4ngRHgOTqs4gXo8u2hzvle5lzzIAR5uxnNOfZakMGPFV47jNpH3oUb8bXXoDR9PE",
      });
      if (currentToken) {
        await pushFcmToken({
          email: email,
          fcmToken: currentToken,
        });
      } else {
        console.log("Failed to generate the app registration token.");
      }
    } else {
      console.log("User Permission Denied.");
    }
  } catch (err) {
    console.error("Error requesting FCM token:", err);
  }
};

export const onMessageListener = (callback) => {
  onMessage(messaging, callback);
};
export {
  storage,
  auth,
  provider,
  signInWithPopup,
  getToken,
  onMessage,
  getMessaging,
  messaging,
};
