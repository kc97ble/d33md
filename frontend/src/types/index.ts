export type ChangeEvent<V> = {
  name: string;
  newValue: V;
};

export type OnChange<V> = (event: ChangeEvent<V>) => void;

export type EditorProps<V> = {
  name: string;
  value: V;
  onChange: OnChange<V>;
};

export * from "./settings";
