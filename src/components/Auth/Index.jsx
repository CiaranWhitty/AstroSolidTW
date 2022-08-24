import { formReg, openReg, showModalReg } from "../../contexts/AuthContext";
import CustomModal from "../../UI/CustomModal";
import Login from "./Login";
import SignUp from "./SignUp";

export default function Auth() {
  return (
    <>
      {openReg() && (
        <CustomModal
          title={formReg() ? "Log In" : "Sign Up"}
          modalOpen={openReg()}
          modalClose={showModalReg}
        >
          {formReg() ? <Login /> : <SignUp />}
        </CustomModal>
      )}
    </>
  );
}
