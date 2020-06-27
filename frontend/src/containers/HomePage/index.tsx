import * as React from "react";
import cx from "classnames";

import NavBar from "../../controls/NavBar";
import MarkDownEditor from "../../editors/MarkDownEditor";
import Menu from "../../controls/Menu";
import PreviewPanel from "../components/PreviewPanel";
import * as api from "../../api";
import styles from "./style.scss";

export default function HomePage() {
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
    <div className={styles.page}>
      <nav>
        <NavBar
          main={<h1>D33MD</h1>}
          right={
            <Menu
              variant="navbar"
              items={[{ text: "Refresh", onClick: refresh }]}
            />
          }
        />
      </nav>
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
      </main>
    </div>
  );
}
