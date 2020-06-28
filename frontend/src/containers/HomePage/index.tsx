import * as React from "react";

import * as api from "src/api";
import type { ChangeEvent } from "src/types";

import MarkDownEditor from "./components/MarkDownEditor";
import PreviewPanel from "./components/PreviewPanel";
import NavBar, { DialogType } from "./components/NavBar";
import EditorOptionsDialog from "./components/EditorOptions";
import styles from "./style.scss";

export default function HomePage() {
  const [text, setText] = React.useState(""); // TODO: to be replaced
  const [preview, setPreview] = React.useState("");
  const [dialog, setDialog] = React.useState(null);

  const refresh = async () => {
    const res = await api.fetchPreview(text);
    if (res.error) {
      alert(JSON.stringify(res));
    } else {
      setPreview(res.data.id);
    }
  };

  const download = async () => {
    const res = await api.fetchPreview(text);
    if (res.error) {
      alert(JSON.stringify(res));
    } else {
      api.download(res.data.id);
    }
  };

  const onChange = (e: ChangeEvent<string>) => {
    setText(e.newValue);
  };

  return (
    <div className={styles.page}>
      <header>
        <NavBar refresh={refresh} download={download} setDialog={setDialog} />
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          <MarkDownEditor
            className={styles.editor}
            name="text"
            value={text}
            onChange={onChange}
          />
          <PreviewPanel className={styles.preview} id={preview} />
        </div>
        {dialog === DialogType.EditorOptions && (
          <EditorOptionsDialog
            onClose={() => setDialog(null)}
            name=""
            value={text}
            onChange={onChange}
          />
        )}
      </main>
    </div>
  );
}
