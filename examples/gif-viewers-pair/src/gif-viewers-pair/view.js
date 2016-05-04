import React from 'react';
import { forwardTo } from 'redux-elm';
import pure from '../pure';

import GifViewer from '../random-gif-viewer/view';

const view = ({ model, dispatch }) => (
  <div>
    <GifViewer model={model.top} dispatch={forwardTo(dispatch, 'Top')} />
    <GifViewer model={model.bottom} dispatch={forwardTo(dispatch, 'Bottom')} />
    <br />
    <button onClick={() => dispatch({ type: 'Load' })}>Load Both!</button>
  </div>
);

export default pure(view);