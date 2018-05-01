import * as React from 'react';
import RLDDLogic from './RLDDLogic';
import './RLDDFloatingItem.css';

export interface RLDDFloatingItemProps {
  logic: RLDDLogic;
  draggedId: number;
}

interface RLDDFloatingItemState {
  offsetX: number;
  offsetY: number;
}

class RLDDFloatingItemComponent extends React.PureComponent<RLDDFloatingItemProps, RLDDFloatingItemState> {

  constructor(props: RLDDFloatingItemProps) {
    super(props);
    const { offsetX, offsetY } = this.props.logic.getState();
    this.state = { offsetX, offsetY };
  }

  componentDidMount() {
    this.props.logic.onMouseMoveSignal.addListener(this.refresh);
  }
  componentWillUnmount() {
    this.props.logic.onMouseMoveSignal.removeListener(this.refresh);
  }

  refresh = () => {
    const { offsetX, offsetY } = this.props.logic.getState();
    this.setState({ offsetX, offsetY });
  }

  render() {
    console.log('RLDDFloatingItemComponent.render');
    if (this.props.draggedId >= -1) {
      return (
        <div
          className="dl-item floating"
          style={{
            pointerEvents: 'none',
            position: 'absolute',
            left: this.state.offsetX || 0,
            top: this.state.offsetY || 0
          }}
        >
          {this.props.children}
        </div>
      );
    } else {
      return undefined;
    }
  }

}

export default RLDDFloatingItemComponent;
