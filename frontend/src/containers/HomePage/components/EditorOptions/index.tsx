import * as React from "react";
import { EditorProps } from "src/types";
import { withBuffer } from "./withBuffer";
import type { WithBufferProps } from "./withBuffer";
import { withSelector } from "./withSelector";
import { getMetadata, setMetadata } from "src/utils/metadata";
import type { Metadata } from "src/utils/metadata";
import { withDialog } from "src/controls/Dialog";

type EditorOptions = {
  fontSize: string;
};

function getEditorOptions(text: string): EditorOptions {
  const m = getMetadata(text);
  return {
    fontSize: m.get("fontSize"),
  };
}

function setEditorOptions(editorOptions: EditorOptions, text: string): string {
  const m = new Map([["fontSize", editorOptions.fontSize]]);
  return setMetadata(text, m);
}

function EditorOptionsDialog(props: EditorProps<EditorOptions> & WithBufferProps) {
  const { value, onChange, name, save } = props;

  function onFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange({
      name: name,
      newValue: { ...value, [event.target.name]: event.target.value },
    });
  }

  return (
    <>
      <label>Font size</label>
      <input
        value={value.fontSize}
        placeholder="12"
        name="fontSize"
        onChange={onFieldChange}
      />
      <button onClick={save}>Save</button>
    </>
  );
}

export default withDialog(
  withSelector(
    getEditorOptions,
    setEditorOptions
  )(withBuffer<EditorOptions>()(EditorOptionsDialog))
);
