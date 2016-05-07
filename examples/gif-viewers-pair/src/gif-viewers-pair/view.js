import React from 'react';
import { createMemoizedForwardTo } from '../memoizedForwardTo';

import GifViewer from '../random-gif-viewer/view';

const forwardToTop = createMemoizedForwardTo('Top');
const forwardToBottom = createMemoizedForwardTo('Bottom');

export default ({ model, dispatch }) => (
  <div>
    <GifViewer model={model.top} dispatch={forwardToTop(dispatch)} />
    <GifViewer model={model.bottom} dispatch={forwardToBottom(dispatch)} />
    <br />
    <button onClick={() => dispatch({ type: 'Load' })}>Load Both!</button>
  </div>
);
