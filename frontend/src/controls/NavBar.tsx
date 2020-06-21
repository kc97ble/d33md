import * as React from "react";

type Props = {
  main?: React.ReactNode;
  right?: React.ReactNode;
};

export default function NavBar(props: Props) {
  const { main = null, right = null } = props;
  return (
    <nav>
      {main}
      {right}
    </nav>
  );
}
