import React from 'react';
import pure from '../pure';

const renderGif = url => {
  if (url) {
    return <img src={url} width="200" height="200" />;
  } else {
    return <img src="/assets/waiting.gif" width="200" height="200" />;
  }
}

const view = ({ model, dispatch }) => console.log(`Rerendered: ${model.topic}`) || (
  <div style={{ width: '200px' }}>
    <h2 style={{ width: '200px', textAlign: 'center' }}>{model.topic}</h2>
    {renderGif(model.gifUrl)}
    <button onClick={() => dispatch({ type: 'RequestMore' })}>More Please!</button>
  </div>
);

export default pure(view);