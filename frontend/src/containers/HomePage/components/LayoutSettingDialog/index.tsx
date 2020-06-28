import * as React from "react";
import { EditorProps } from "src/types";
import { withBuffer } from "../../../../controls/withBuffer";
import type { WithBufferProps } from "../../../../controls/withBuffer";
import { withSelector } from "../../../../controls/withSelector";
import { getMetadata, setMetadata } from "src/utils/metadata";
import type { Metadata } from "src/utils/metadata";
import { withDialog } from "src/controls/withDialog";

type LayoutSetting = {
  fontSize: string;
};

function getLayoutSetting(text: string): LayoutSetting {
  const m = getMetadata(text);
  return {
    fontSize: m.get("fontSize"),
  };
}

function setLayoutSetting(layoutSetting: LayoutSetting, text: string): string {
  const m = new Map([["fontSize", layoutSetting.fontSize]]);
  return setMetadata(text, m);
}

function LayoutSettingDialog(props: EditorProps<LayoutSetting> & WithBufferProps) {
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
    getLayoutSetting,
    setLayoutSetting
  )(withBuffer<LayoutSetting>()(LayoutSettingDialog))
);
