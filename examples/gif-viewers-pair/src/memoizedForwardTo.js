import { forwardTo } from 'redux-elm';
import { defaultMemoize } from 'reselect/lib/';

export const createMemoizedForwardTo = (...staticTypes) => {
  const memoized = {};
  const staticTypesPath = staticTypes.join('.');
  return (dispatch, ...dynamicTypes) => {
    const finalPath = staticTypesPath + dynamicTypes.join('.');

    let memoizedForwardTo = memoized[finalPath];
    if (!memoizedForwardTo) {
      memoizedForwardTo = memoized[finalPath] = defaultMemoize((dispatch) => forwardTo(dispatch, ...[...staticTypes, ...dynamicTypes]));
    }

    return memoizedForwardTo(dispatch);
  }
};
