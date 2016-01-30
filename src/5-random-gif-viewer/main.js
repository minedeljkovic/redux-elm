import React from 'react';
import request from 'superagent-bluebird-promise';

const REQUEST_MORE = 'REQUEST_MORE';
const NEW_GIF = 'NEW_GIF';

// EFFECTS

const randomUrl = topic => `http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${topic}`;

export const getRandomGif = topic =>
  dispatch =>
    request.get(randomUrl(topic))
      .then(response => dispatch(NEW_GIF, response.body.data.image_url));


// UPDATE

const initialModel = {
  topic: '',
  gifUrl: 'assets/waiting.gif'
};

export function* init(topic = '') {
  yield getRandomGif(topic);

  return {
    ...initialModel,
    topic
  };
}

export function* update(model = initialModel, action) {
  const { type, payload } = action;

  switch (type) {
  case REQUEST_MORE:
    yield getRandomGif(model.topic);
    return model;

  case NEW_GIF:
    return {...model, gifUrl: payload};

  default:
    return model;
  }
}

// VIEW

const headerStyle = () => ({
  width: '200px',
  textAlign: 'center'
});

const imgStyle = url => ({
  display: 'inline-block',
  width: '200px',
  height: '200px',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  backgroundImage: `url('${url}')`
});

export const View = ({dispatch, model}) => (
  <div style={{width: '200px'}}>
    <h2 style={headerStyle()}>{model.topic}</h2>
    <div style={imgStyle(model.gifUrl)}></div>
    <button onClick={() => dispatch(REQUEST_MORE)}>More Please!</button>
  </div>
);

