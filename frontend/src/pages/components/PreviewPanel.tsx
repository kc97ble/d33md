import * as React from "react";

export default function PreviewPanel(props: any) {
  return (
    <div>
      <embed
        src={props.url}
        width="500"
        height="375"
        type="application/pdf"
      />
    </div>
  );
}
