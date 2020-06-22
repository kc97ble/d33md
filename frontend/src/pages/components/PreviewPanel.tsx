import * as React from "react";
import * as api from "../../api";

export default function PreviewPanel(props: any) {
  return (
    <div>
      <embed
        src={props.id ? api.viewUrl(props.id) : ""}
        width="500"
        height="375"
        type="application/pdf"
      />
    </div>
  );
}
