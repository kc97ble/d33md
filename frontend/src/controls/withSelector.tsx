import * as React from "react";
import { EditorProps, OnChange, ChangeEvent } from "src/types";

type Transform<S, T> = (source: S) => T;
type Combine<S, T> = (source: S, target?: T) => T;

export function withSelector<V1, V2>(encode: Transform<V1, V2>, decode: Combine<V2, V1>) {
  return function (WrappedComponent: React.ComponentType<EditorProps<V2>>) {
    return class extends React.Component<EditorProps<V1>> {
      onChange: OnChange<V2> = (event: ChangeEvent<V2>) => {
        const { name, newValue } = event;
        this.props.onChange({ name: name, newValue: decode(newValue, this.props.value) });
      };

      render() {
        const { value, onChange, ...otherProps } = this.props;

        return (
          <WrappedComponent
            value={encode(value)}
            onChange={this.onChange}
            {...otherProps}
          />
        );
      }
    };
  };
}
