import * as React from "react";

import NavBar from "../controls/NavBar";
import MarkDownEditor from "../editors/MarkDownEditor";
import Menu from "../controls/Menu";
import PreviewPanel from "./components/PreviewPanel";

export default function App() {
  return (
    <div>
      <header>
        <NavBar main={<h1>D33MD</h1>} right={<Menu items={[]} />} />
      </header>
      <main>
        <MarkDownEditor />
        <PreviewPanel />
      </main>
    </div>
  );
}
