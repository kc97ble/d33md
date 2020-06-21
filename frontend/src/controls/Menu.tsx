import * as React from "react";

type OnMenuItemClick = () => void;

type MenuItem = {
  text: string;
  onClick: OnMenuItemClick | Array<MenuItem>;
};

type Props = {
  items: Array<MenuItem>;
  variant: "navbar";
};

export default function Menu(props: Props) {
  const { items, variant } = props;
  if (variant === "navbar") {
    return (
      <div>
        {items.map((item, index) => {
          if (Array.isArray(item.onClick)) {
            throw Error("not implemented");
          }
          return <button onClick={item.onClick}>{item.text}</button>;
        })}
      </div>
    );
  }
}
