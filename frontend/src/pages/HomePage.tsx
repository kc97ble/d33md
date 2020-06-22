import * as React from "react";

import NavBar from "../controls/NavBar";
import MarkDownEditor from "../editors/MarkDownEditor";
import Menu from "../controls/Menu";
import PreviewPanel from "./components/PreviewPanel";
import * as api from "../api";

export default function App() {
  const [text, setText] = React.useState(""); // TODO: to be replaced
  const [preview, setPreview] = React.useState("");

  const refresh = async () => {
    const res = await api.fetchPreview(text);
    if (res.error) {
      alert(JSON.stringify(res));
    } else {
      setPreview(res.data.id);
    }
  };

  return (
    <div>
      <header>
        <NavBar
          main={<h1>D33MD</h1>}
          right={
            <Menu
              variant="navbar"
              items={[{ text: "Refresh", onClick: refresh }]}
            />
          }
        />
      </header>
      <main>
        <MarkDownEditor
          name="text"
          value={text}
          onChange={(e) => {
            setText(e.newValue);
          }}
        />
        <PreviewPanel id={preview} />
      </main>
    </div>
  );
}
