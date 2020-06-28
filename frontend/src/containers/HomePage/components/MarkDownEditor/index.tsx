import * as React from "react";
import styles from "./style.scss";
import cx from "classnames";
import { EditorProps, DEFAULT_EDITOR_SETTINGS } from "src/types";
import { EditorSettings } from "src/types";

type Props = EditorProps<string> & {
  className?: string;
  editorSettings: EditorSettings;
};

function toInt(s: string, def: number) {
  const n = parseInt(s, 10);
  return isNaN(n) ? def : n;
}

export default function MarkDownEditor(props: Props) {
  const { name, value, onChange, className = "", editorSettings } = props;

  const fontSize = toInt(
    editorSettings.fontSize,
    toInt(DEFAULT_EDITOR_SETTINGS.fontSize, 0)
  );

  const onValueChange = React.useCallback((e) => {
    onChange({ name: name, newValue: e.target.value });
  }, []);

  return (
    <div className={cx(className, styles.container)}>
      <textarea
        className={styles.textarea}
        style={{ fontSize: fontSize }}
        onInput={onValueChange}
        value={value}
      />
    </div>
  );
}
