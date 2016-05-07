import {Component} from 'react';
import shallowEqual from 'recompose/shallowEqual';
import createElement from 'recompose/createElement';
import getDisplayName from 'recompose/getDisplayName';

export default function(BaseComponent) {
  class Pure extends Component {
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
      return createElement(BaseComponent, { ...this.props, dispatch: this.dispatch });
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    Pure.displayName = `pure(${getDisplayName(BaseComponent)})`;
  }

  return Pure;
}
