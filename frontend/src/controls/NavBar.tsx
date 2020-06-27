import * as React from "react";
import styles from "./style.scss";

type Props = {
  main?: React.ReactNode;
  right?: React.ReactNode;
};

export default function NavBar(props: Props) {
  const { main = null, right = null } = props;
  return (
    <div className={styles.container}>
      <div className={styles.main}>{main}</div>
      <div className={styles.right}>{right}</div>
    </div>
  );
}
