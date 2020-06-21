import * as React from "react";
import MarkDownEditor from "../../editors/MarkDownEditor";
import PreviewPanel from "./PreviewPanel";

export default function MainEditor() {
  return (
    <div>
      <MarkDownEditor />
      <PreviewPanel />
    </div>
  );
}
