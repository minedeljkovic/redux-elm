import React from 'react';
import { defaultMemoize } from 'reselect/lib/';
import { createMemoizedForwardTo } from '../memoizedForwardTo';

import GifViewer from '../random-gif-viewer/view';

const forwardToGifViewer = createMemoizedForwardTo('GifViewer');

const inputStyle = {
  width: '100%',
  height: '40px',
  padding: '10px 0',
  fontSize: '2em',
  textAlign: 'center'
};

export default ({ model, dispatch }) => (
  <div>
    <input
      placeholder="What kind of gifs do you want?"
      value={model.topic}
      onKeyDown={ev => ev.keyCode === 13 ? dispatch({ type: 'Create' }) : null}
      onChange={ev => dispatch({ type: 'ChangeTopic', value: ev.target.value })}
      style={inputStyle} />
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      {model.gifViewers.map((gifViewerModel, index) =>
        <GifViewer key={index} model={gifViewerModel} dispatch={forwardToGifViewer(dispatch, index)} />)}
    </div>
  </div>
);