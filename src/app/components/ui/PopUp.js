import { useDispatch } from "react-redux";
import styles from "./PopUp.module.scss";
import { alertActions } from "@/app/redux/slices/alert-slice";

export default function PopUp({ message, type }) {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(alertActions.hideAlert())}
      className={`${styles["popUp-wrapper"]} ${styles[type]}`}
    >
      <p type={type}>{message}</p>
    </div>
  );
}
