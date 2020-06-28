import * as React from "react";

import cx from "classnames";
import styles from "./style.scss";

type MenuItemProps = {
  text: string;
  subMenu?: Partial<SubMenuProps>;
  active: boolean;
  onClick?: () => void;
  setActive: (newActive: boolean) => void;
  closeMenu: () => void;
};

export enum SubMenuPosition {
  Static,
  Bottom,
  Right,
}

type SubMenuProps = {
  position: SubMenuPosition;
  items: Array<Partial<MenuItemProps>>;
  className?: string;
  closeMenu: () => void;
};

const SUB_MENU_POSITION_STYLES = {
  [SubMenuPosition.Static]: styles.subMenuStatic,
  [SubMenuPosition.Bottom]: styles.subMenuBottom,
  [SubMenuPosition.Right]: styles.subMenuRight,
};

export function SubMenu(props: SubMenuProps) {
  const { position, items, closeMenu, className = "" } = props;
  const positionStyle = SUB_MENU_POSITION_STYLES[position];

  const [activeIndex, setActiveIndex] = React.useState(null);
  return (
    <div className={cx(styles.subMenu, positionStyle, className)}>
      {items.map((itemProps, index) => (
        <MenuItem
          active={index === activeIndex}
          setActive={(newActive) => setActiveIndex(newActive ? index : null)}
          closeMenu={() => {
            setActiveIndex(null);
            closeMenu();
          }}
          key={index}
          text=""
          {...itemProps}
        ></MenuItem>
      ))}
    </div>
  );
}

export function MenuItem(props: MenuItemProps) {
  const { text, subMenu = null, active, setActive, closeMenu, onClick } = props;

  const handleClick = () => {
    !!onClick && onClick();
    !!subMenu ? setActive(!active) : closeMenu();
  };

  return (
    <div style={{ position: "relative" }}>
      <button onClick={handleClick}>{text}</button>
      {!!subMenu && active && (
        <SubMenu
          position={SubMenuPosition.Bottom}
          items={[]}
          {...subMenu}
          closeMenu={closeMenu}
        />
      )}
    </div>
  );
}

export function MainMenu(props: Partial<SubMenuProps>) {
  const { items = [], ...otherProps } = props;
  const editedItems = items.map((item) => ({
    position: SubMenuPosition.Bottom,
    ...item,
  }));
  return (
    <SubMenu
      position={SubMenuPosition.Static}
      items={editedItems}
      className={styles.mainMenu}
      closeMenu={() => {}}
      {...otherProps}
    />
  );
}
