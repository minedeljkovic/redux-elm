import React from 'react';
import { render } from 'react-dom';
import { createStore, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import { createEffectCapableStore } from 'redux-side-effects';

export default (containerDomId, View, updater) => {
  const storeFactory = compose(
    createEffectCapableStore,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store = storeFactory(updater);

  const ConnectedView = connect(appState => ({
    model: appState
  }))(View);

  render((
    <Provider store={store}>
      <ConnectedView />
    </Provider>
  ), document.getElementById(containerDomId));
}