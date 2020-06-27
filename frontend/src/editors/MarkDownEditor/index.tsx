import * as React from "react";
import styles from "./style.scss";
import cx from "classnames";

type ChangeEvent<V> = {
  name: string;
  newValue: V;
};

type OnChange<V> = (event: ChangeEvent<V>) => void;
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
      <textarea className={styles.textarea} onInput={onValueChange}>
        {value}
      </textarea>
    </div>
  );
}
