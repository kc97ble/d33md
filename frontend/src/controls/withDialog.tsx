import * as React from "react";

type withDialogProps = {
  onClose: () => void;
};

export function withDialog<P>(WrappedComponent: React.ComponentType<P>) {
  return class extends React.Component<withDialogProps & P> {
    id: string = Math.random().toString();
    render() {
      const { onClose, ...otherProps } = this.props;
      return (
        <>
          <input
            type="checkbox"
            id={this.id}
            className="modal"
            checked={true}
            onChange={() => onClose()}
          />
          <div>
            <div className="card large">
              <label htmlFor={this.id} className="modal-close"></label>
              <h3 className="section">Modal</h3>
              <div className="section">
                <WrappedComponent {...(otherProps as P)} />
              </div>
            </div>
          </div>
        </>
      );
    }
  };
}
