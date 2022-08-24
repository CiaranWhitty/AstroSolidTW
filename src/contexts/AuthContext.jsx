import { createSignal, createEffect } from "solid-js";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  browserSessionPersistence,
  setPersistence,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../config/firebase";

const [currentUserState, setCurrentUserState] = createSignal();
const [currentUser, setCurrentUser] = createSignal(null);
const [currentUserEV, setCurrentUserEV] = createSignal(false);
const [loading, setLoading] = createSignal(true);
const [errAuthMessage, setErrAuthMessage] = createSignal("");

function signup(email, password) {
  try {
    createUserWithEmailAndPassword(auth, email, password);
    showModalReg();
  } catch (error) {
    setErrAuthMessage("Signup Failed");
  }
}

function login(email, password) {
  setPersistence(auth, browserSessionPersistence)
    .then(async () => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        showModalReg();
      } catch (error) {
        setErrAuthMessage("Login Failed");
      }
    })
    .catch((error) => {
      setErrAuthMessage("Login Failed");
    });
}

function logout() {
  return signOut(auth);
}

function resetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}

function updatePassword(password) {
  return currentUser()
    .updatePassword(auth, password)
    .then(() => {})
    .catch((error) => {});
}

function send_verification() {
  sendEmailVerification(auth.currentUser)
    .then(() => {
      // console.log("* Please Verify Your Email *");
    })
    .catch((error) => {
      // console.log("Error: " + error.message);
    });
}

function checkIfVerified(user) {
  try {
    if (user.emailVerified) {
      setCurrentUserEV(true);
    } else {
      send_verification();
      setCurrentUserEV(false);
      signOut(auth);
    }
  } catch {}
}

createEffect(() => {
  setLoading(true);
  // console.log("01", loading());
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      console.log("02", loading());
      checkIfVerified(currentUser);
      setCurrentUserState(true);
      setCurrentUser(currentUser);
      setLoading(false);
      // console.log("02", loading());
    } else {
      setCurrentUserState(false);
      checkIfVerified(currentUser);
      setCurrentUser(null);
      setLoading(false);
      // console.log("03", loading());
    }
  });
});

const [formReg, setFormReg] = createSignal(true);
function changeFormReg() {
  setFormReg(!formReg());
}

const [openReg, setOpenReg] = createSignal(false);
function showModalReg() {
  setOpenReg(!openReg());
}

export { loading };
export { currentUserState };
export { currentUserEV };
export { currentUser };
export { login };
export { signup };
export { logout };
export { resetPassword };
export { updatePassword };

export { formReg };
export { setFormReg };
export { changeFormReg };

export { openReg };
export { setOpenReg };
export { showModalReg };

export { errAuthMessage };
export { setErrAuthMessage };
