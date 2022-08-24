
import styles from "../styles/CustomInput.module.css";

export default function CustomInput(props) {
  // console.log("CustomInput: Props. - ", props);
  return (
    <div class={styles.Input}>
      <span>{props.label}</span>
      <input
        placeholder={props.placeholder}
        ref={props.ref}
        onInput={props.onInput}
        onClick={props.onClick}
        type={props.type}
        value={props.value}
        defaultValue={props.defaultValue}
        min={props.min}
        max={props.max}
      />
    </div>
  )
}
