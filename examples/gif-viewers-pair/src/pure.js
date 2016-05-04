import React, {Component} from 'react';
import shallowEqual from 'fbjs/lib/shallowEqual';

export default function(BaseComponent) {
  return class extends Component {
    constructor(props) {
      super(props);

      this.dispatch = this.dispatch.bind(this);
    }

    shouldComponentUpdate(nextProps) {
      return Object.keys(this.props).some(prop => {
        return (prop !== 'dispatch' && !shallowEqual(this.props[prop], nextProps[prop]));
      });
    }

    dispatch(...args) {
      this.props.dispatch(...args);
    }

    render() {
      const baseComponentProps = { ...this.props, dispatch: this.dispatch };
      return <BaseComponent {...baseComponentProps}/>;
    }
  }
}