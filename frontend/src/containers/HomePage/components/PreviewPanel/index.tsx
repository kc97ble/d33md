import * as React from "react";
import * as api from "../../../../api";
import styles from "./style.scss";
import cx from "classnames";

export default function PreviewPanel(props: { className?: string; id: string }) {
  const { className = "" } = props;
  return (
    <embed
      className={cx(className, styles.embed)}
      src={props.id ? api.viewUrl(props.id) : ""}
      type="application/pdf"
    />
  );
}
