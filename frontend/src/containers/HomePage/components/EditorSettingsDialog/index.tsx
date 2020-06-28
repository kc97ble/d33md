import * as React from "react";
import { withDialog } from "src/controls/withDialog";
import type { EditorProps, EditorSettings } from "src/types";

function EditorSettingsDialog(props: EditorProps<EditorSettings>) {
  const { value, onChange } = props;
  function onFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange({
      name: name,
      newValue: { ...value, [event.target.name]: event.target.value },
    });
  }
  return (
    <form>
      <fieldset>
        <legend>Basic</legend>
        <label>Font size</label>
        <input
          type="number"
          name="fontSize"
          value={value.fontSize}
          onChange={onFieldChange}
        />
      </fieldset>
    </form>
  );
}

export default withDialog(EditorSettingsDialog);
