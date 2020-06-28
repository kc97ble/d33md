import * as React from "react";
import * as api from "../../../../api";
import styles from "./style.scss";
import cx from "classnames";

export default function ErrorPanel(props: { className?: string; errorText: string }) {
  const { className = "", errorText } = props;
  return <textarea className={cx(className, styles.textarea)}>{errorText}</textarea>;
}
