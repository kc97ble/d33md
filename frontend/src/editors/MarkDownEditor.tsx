import * as React from "react";

type ChangeEvent<V> = {
  name: string;
  newValue: V;
};

type OnChange<V> = (event: ChangeEvent<V>) => void;
type Props = {
  name: string;
  value: string;
  onChange: OnChange<string>;
};

export default function MarkDownEditor(props: Props) {
  const { name, value, onChange } = props;
  const onValueChange = React.useCallback((e) => {
    onChange({ name: name, newValue: e.target.value });
  }, []);
  return (
    <div>
      <textarea onInput={onValueChange}>{value}</textarea>
    </div>
  );
}
