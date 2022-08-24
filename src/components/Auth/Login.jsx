import { createSignal } from "solid-js";

import {
  changeFormReg,
  login,
  errAuthMessage,
  setErrAuthMessage,
} from "../../contexts/AuthContext";

import CustomPaper from "../../UI/CustomPaper";
import CustomButton from "../../UI/CustomButton";
import CustomInput from "../../UI/CustomInput";

import styles from "../../styles/Reg.module.css";

export default function Login() {
  const [loading, setLoading] = createSignal(false);
  setErrAuthMessage("");

  async function handleSubmit(e) {
    e.preventDefault();
    let message = "";
    const emailC = values().email.trim();
    const passwordC = values().password.trim();

    try {
      setLoading(true);
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
        setErrAuthMessage("Please Enter An Password");
        throw (message = "Please Enter A Password");
      }

      login(emailC, passwordC);
      setLoading(false);
    } catch (err) {
      // console.log("Login: Error - ", err)
    }
    setLoading(false);
  }

  const [values, setValues] = createSignal({
    email: "",
    password: "",
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
      <CustomInput
        label={"Email:"}
        placeholder={"johndoe@email.com"}
        type="email"
        onInput={handleChange("email")}
      />
      <CustomInput
        label={"Password:"}
        placeholder={"*******"}
        type={values().showPassword ? "text" : "password"}
        onInput={handleChange("password")}
      />
      <CustomInput
        label={"Show Password:"}
        type="checkbox"
        onInput={handleChange("showPassword")}
      />
      <h4>
        Need An Account? <a onClick={changeFormReg}>Sign Up</a>
      </h4>
      <CustomButton onClick={handleSubmit} disabled={loading()}>
        Submit
      </CustomButton>
    </CustomPaper>
  );
}
