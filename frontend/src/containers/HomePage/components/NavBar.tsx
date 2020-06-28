import * as React from "react";

import PureNavBar from "../../../controls/NavBar";
import { MainMenu } from "../../../controls/MenuV2";
import styles from "./NavBar.scss";

type Props = {
  refresh: () => void;
};

function ProductLogo() {
  return <div className={styles.productLogo}>D33MD</div>;
}

export default function NavBar(props: Props) {
  const { refresh } = props;
  return (
    <PureNavBar
      main={<ProductLogo />}
      right={
        <MainMenu items={[{ text: "Refresh", onClick: refresh }, { text: "Export" }]} />
      }
    />
  );
}
