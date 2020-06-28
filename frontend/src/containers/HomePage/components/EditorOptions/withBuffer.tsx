import * as React from "react";
import { EditorProps, ChangeEvent } from "src/types";

export type WithBufferProps = {
  save: () => void;
};

export function withBuffer<V>() {
  return function (
    WrappedComponent: React.ComponentType<EditorProps<V> & WithBufferProps>
  ) {
    return class extends React.Component<EditorProps<V>> {
      state: { value: V } = { value: null };

      onChange = (e: ChangeEvent<V>) => {
        this.setState({ value: e.newValue });
      };

      save = () => {
        this.props.onChange({
          name: this.props.name,
          newValue: this.state.value === null ? this.props.value : this.state.value,
        });
        this.setState(null);
      };

      render() {
        const { name, value: propsValue } = this.props;
        const { value: stateValue } = this.state;
        return (
          <WrappedComponent
            name={name}
            value={stateValue === null ? propsValue : stateValue}
            onChange={this.onChange}
            save={this.save}
          />
        );
      }
    };
  };
}
