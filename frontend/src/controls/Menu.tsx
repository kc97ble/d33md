import * as React from "react";

type OnMenuItemClick = () => void;

type MenuItem = {
  text: string;
  onClick: OnMenuItemClick | Array<MenuItem>;
};

type Props = {
  items: Array<MenuItem>;
};

export default function Menu(props: Props) {
  const { items } = props;
  return <pre>{JSON.stringify(items)}</pre>;
}
