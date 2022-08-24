import { initializeApp } from "firebase/app";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";
import { getAuth } from "firebase/auth";
import { createEffect } from "solid-js";

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.PUBLIC_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Create a ReCaptchaEnterpriseProvider instance using your reCAPTCHA Enterprise
// site key and pass it to initializeAppCheck().

// self.FIREBASE_APPCHECK_DEBUG_TOKEN =
//   import.meta.env.PUBLIC_APP_CHECK_DEBUG_TOKEN_FROM_CI;

let appCheck;
createEffect(() => {
  appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(
      import.meta.env.PUBLIC_CAPTCHA_ENTERPRISE
    ),
    isTokenAutoRefreshEnabled: true, // Set to true to allow auto-refresh.
  });
});

export { auth, appCheck };
