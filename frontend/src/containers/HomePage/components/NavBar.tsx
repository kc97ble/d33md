import * as React from "react";

import PureNavBar from "src/controls/NavBar";
import { MainMenu } from "src/controls/MenuV2";

export enum DialogType {
  EditorSetting,
  LayoutSetting,
}

type Props = {
  refresh: () => void;
  download: () => void;
  setDialog: (dialog: DialogType) => void;
};

function ProductLogo() {
  return <div className={"logo"}>D33MD</div>;
}

export default function NavBar(props: Props) {
  const { refresh, download, setDialog } = props;
  return (
    <PureNavBar
      main={<ProductLogo />}
      right={
        <MainMenu
          items={[
            {
              text: "Settings",
              subMenu: {
                items: [
                  {
                    text: "Editor settings",
                    onClick: () => setDialog(DialogType.EditorSetting),
                  },
                  {
                    text: "Layout settings",
                    onClick: () => setDialog(DialogType.LayoutSetting),
                  },
                ],
              },
            },
            { text: "Refresh", onClick: refresh },
            { text: "Export", onClick: download },
          ]}
        />
      }
    />
  );
}
