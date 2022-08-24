import { createSignal } from "solid-js";

import { v4 as uuidv4 } from "uuid";

import { appCheck } from "../../config/firebase";
import { getToken } from "firebase/app-check";
import {
  changeFormReg,
  signup,
  errAuthMessage,
  setErrAuthMessage,
} from "../../contexts/AuthContext";

import CustomPaper from "../../UI/CustomPaper";
import CustomInput from "../../UI/CustomInput";
import CustomButton from "../../UI/CustomButton";

import styles from "../../styles/Reg.module.css";

export default function SignUp() {
  const [loading, setLoading] = createSignal(false);
  setErrAuthMessage("");

  async function handleSubmit(e) {
    e.preventDefault();
    const emailC = values().email.trim();
    const fNameC = values().fName.trim();
    const lNameC = values().lName.trim();
    const passwordC = values().password.trim();
    const passwordConfirmC = values().confirmPassword.trim();
    let message = "";
    let res = null;
    let appCheckTokenReponse;

    try {
      appCheckTokenReponse = await getToken(appCheck, false);
    } catch (err) {
      // console.log("err", err);
      return;
    }

    try {
      setLoading(true);
      if (fNameC === "") {
        setErrAuthMessage("Please Enter A First Name");
        throw (message = "Please Enter A First Name");
      }
      if (lNameC === "") {
        setErrAuthMessage("Please Enter A Last Name");
        throw (message = "Please Enter A Last Name");
      }
      if (emailC === "") {
        setErrAuthMessage("Please Enter An Email");
        throw (message = "Please Enter An Email");
      }
      if (
        emailC.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) === null
      ) {
        setErrAuthMessage("Invalid Email");
        throw (message = "Invalid Email");
      }
      if (passwordC === "") {
        setErrAuthMessage("Please Enter A Password");
        throw (message = "Please Enter A Password");
      }
      if (passwordC.length < 6) {
        setErrAuthMessage("Passwords Must Have 6 Charaters or More");
        throw (message = "Passwords Must Have 6 Charaters or More");
      }
      if (passwordC !== passwordConfirmC) {
        setErrAuthMessage("Passwords Do Not Match");
        throw (message = "Passwords Do Not Match");
      }

      await signup(emailC, passwordC)
        .then(async (obj) => {
          const uId = uuidv4();
          res = await fetch(
            `${import.meta.env.VITE_CLOUD_FUNCTION_API_URL}/user`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Firebase-AppCheck": appCheckTokenReponse.token,
              },
              body: JSON.stringify({
                uId: uId,
                email: emailC,
                fName: fNameC,
                lName: lNameC,
              }),
            }
          );

          // console.log("Signup: Congratulations Account created")
          return await res.json();
        })
        .catch((err) => {
          // console.log("Signup: Error02 - ", err)
        });
      setLoading(false);
    } catch (err) {
      // console.log("Signup: Error03 - ", err)
    }
    setLoading(false);
  }

  const [values, setValues] = createSignal({
    email: "",
    fName: "",
    lName: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    if (prop === "showPassword") {
      setValues({ ...values(), [prop]: event.target.checked });
    } else {
      setValues({ ...values(), [prop]: event.target.value });
    }
  };

  return (
    <CustomPaper center>
      <h4 class={styles.Errors}>{errAuthMessage()}</h4>
      <div class={styles.sideBySide}>
        <CustomInput
          label={"First Name:"}
          placeholder={"John"}
          onInput={handleChange("fName")}
          type="text"
        />
        <CustomInput
          label={"Last Name:"}
          placeholder={"Doe"}
          onInput={handleChange("lName")}
          type="text"
        />
      </div>
      <CustomInput
        label={"Email:"}
        placeholder={"johndoe@email.com"}
        type="email"
        onInput={handleChange("email")}
      />
      <div class={styles.sideBySide}>
        <CustomInput
          label={"Password:"}
          placeholder={"*******"}
          type={values().showPassword ? "text" : "password"}
          onInput={handleChange("password")}
        />
        <CustomInput
          label={"Confirm Password:"}
          placeholder={"*******"}
          type={values().showPassword ? "text" : "password"}
          onInput={handleChange("confirmPassword")}
        />
      </div>
      <CustomInput
        label={"Show Passwords:"}
        type="checkbox"
        onInput={handleChange("showPassword")}
      />
      <h4>
        Have An Account? <a onClick={changeFormReg}>Log In</a>
      </h4>
      <CustomButton onClick={handleSubmit} disabled={loading()}>
        Submit
      </CustomButton>
    </CustomPaper>
  );
}
