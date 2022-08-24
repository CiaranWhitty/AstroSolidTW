import styles from "../styles/CustomPaper.module.css";

export default function CustomPaper(props) {
  return (
    <>
      {props.item ?
        <>
          {
            props.center ?
              <div class={styles.PaperItem}>
                <div class={styles.Center}>
                  {props.children}
                </div>
              </div>
              :
              <div class={styles.PaperItem}>
                {props.children}
              </div>
          }</>
        :
        <>
          {props.center ?
            <div class={styles.Paper}>
              <div class={styles.Center}>
                {props.children}
              </div>
            </div>
            :
            <div class={styles.Paper}>
              {props.children}
            </div>
          }
        </>
      }
    </>
  )
}
