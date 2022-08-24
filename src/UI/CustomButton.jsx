import styles from "../styles/CustomButton.module.css";

export default function CustomButton(props) {
  // console.log("CustomButton: Props. - ", props);
  return (
    <div class={styles.Con}>
      {props.disabled ? (
        <button class={styles.Button} disabled>
          {props.children}
        </button>
      ) : (
        <>
          {props.href ? (
            <a href={`/${props.href}`}>
              <button
                class={styles.Button}
                onClick={props.onClick}
                style={props.style}
              >
                {props.children}
              </button>
            </a>
          ) : (
            <button
              class={styles.Button}
              onClick={props.onClick}
              style={props.style}
            >
              {props.children}
            </button>
          )}
        </>
      )}
    </div>
  );
}
