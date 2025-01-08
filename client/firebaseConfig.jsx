import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { deleteToken, getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const messaging = getMessaging(app);
export const requestPermission = () => {
  console.log("Requesting User Permission......");
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      console.log("Notification User Permission Granted.");
      return getToken(messaging, {
        vapidKey: "BGFVb-1T_Bfq9OQ9BCY63EH42190LrHhf5_tp4OXh7k0QqgMwrOovOQ6Fd9leeBJpomk1_rmq8z46xHmoLfxolo"
      }).then(currentToken => {
        if (currentToken) {
          authService.pushTokenFCM({ fcm: currentToken });
        }
        else {
          console.log("Failed to generate the app registration token.");
        }
      }).catch(err => {
        console.error(err)
      })
    }
    else {
      console.log("User Permission Denied.")
    }
  })
}
export const removeToken = async () => {
  try {
    const currentToken = await getToken(messaging);
    if (currentToken) {
      await deleteToken(messaging);
      console.log("Token removed successfully.");
    } else {
      console.log("No token to delete.");
    }
  } catch (error) {
    console.error("Error deleting token:", error);
  }
}
// export const onMessageListener = () => {
//   return new Promise(resolve => {
//     onMessage(messaging, payload => {
//       resolve(payload)
//     })
//   })
// }
export const onMessageListener = (payload) => {
  onMessage(messaging, callback); // Gọi callback khi có thông báo
}
export {
  storage,
  auth,
  provider,
  signInWithPopup
}