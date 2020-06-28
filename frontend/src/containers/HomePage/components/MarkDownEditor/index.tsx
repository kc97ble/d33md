import * as React from "react";
import styles from "./style.scss";
import cx from "classnames";
import type { OnChange } from "src/types";

type Props = {
  className?: string;
  name: string;
  value: string;
  onChange: OnChange<string>;
};

export default function MarkDownEditor(props: Props) {
  const { name, value, onChange, className = "" } = props;
  const onValueChange = React.useCallback((e) => {
    onChange({ name: name, newValue: e.target.value });
  }, []);
  return (
    <div className={cx(className, styles.container)}>
      <textarea className={styles.textarea} onInput={onValueChange} value={value} />
    </div>
  );
}
