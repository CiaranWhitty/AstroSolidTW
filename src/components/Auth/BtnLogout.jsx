import { logout } from "../../contexts/AuthContext";

export default function BtnLogout() {
  return (
    <li>
      <a onClick={() => logout()} href="/">
        Logout
      </a>
    </li>
  );
}
