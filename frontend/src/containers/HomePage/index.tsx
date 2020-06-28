import * as React from "react";
import cx from "classnames";

import MarkDownEditor from "./components/MarkDownEditor";
import PreviewPanel from "./components/PreviewPanel";
import * as api from "../../api";
import styles from "./style.scss";
import { MainMenu } from "../../controls/MenuV2";
import NavBar, { DialogType } from "./components/NavBar";
import { withDialog } from "src/controls/Dialog";
import EditorOptions from "./components/EditorOptions";

const EditorOptionsDialog = withDialog(EditorOptions);

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
            onChange={(e) => {
              setText(e.newValue);
            }}
          />
          <PreviewPanel className={styles.preview} id={preview} />
        </div>
        {dialog === DialogType.EditorOptions && (
          <EditorOptionsDialog onClose={() => setDialog(null)} />
        )}
      </main>
    </div>
  );
}
