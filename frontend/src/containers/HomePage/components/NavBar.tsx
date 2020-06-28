import * as React from "react";

import PureNavBar from "src/controls/NavBar";
import { MainMenu } from "src/controls/MenuV2";

type Props = {
  refresh: () => void;
  download: () => void;
};

function ProductLogo() {
  return <div className={"logo"}>D33MD</div>;
}

export default function NavBar(props: Props) {
  const { refresh, download } = props;
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
                  { text: "Editor setting..." },
                  { text: "Layout setting..." },
                  { text: "Preview setting..." },
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
