import {
  setFormReg,
  showModalReg,
  loading,
  currentUserState,
} from "../../contexts/AuthContext";
import BtnLogout from "./BtnLogout";

export default function LoginBtn() {
  return (
    <>
      {loading() ? (
        <>
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <div class="flex w-10 items-center justify-center rounded-full">
              <svg
                class=" rounded-full bg-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 16 16"
              ></svg>
            </div>
          </label>
        </>
      ) : (
        <>
          {currentUserState() ? (
            <div class="dropdown-end dropdown">
              <label tabindex="0" class="btn btn-ghost btn-circle">
                <div class="flex w-10 items-center justify-center rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                </div>
              </label>
              <ul
                tabindex="0"
                class="dropdown-content menu rounded-box menu-compact mt-3 w-40 bg-base-100 p-2 shadow"
              >
                <li>
                  <a href="/profile" class="justify-between">
                    Profile
                  </a>
                </li>
                <li>
                  <a href="/settings">Settings</a>
                </li>
                <BtnLogout />
              </ul>
            </div>
          ) : (
            <div>
              <a
                onClick={() => {
                  setFormReg(true);
                  showModalReg();
                }}
                class="btn btn-ghost p-0 text-base normal-case sm:text-xl"
              >
                Login
              </a>
            </div>
          )}
        </>
      )}
    </>
  );
}
