import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { onPageLoad } from 'meteor/server-render';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import routes from '../both/routes';
import mainReducer from '../../api/redux/reducers';
import { createLogger } from 'redux-logger'; // eslint-disable-line
import { composeWithDevTools } from 'redux-devtools-extension'; // eslint-disable-line

const preloadedState = window.__PRELOADED_STATE__; // eslint-disable-line

delete window.__PRELOADED_STATE__; // eslint-disable-line

// eslint-disable-next-line
const store = createStore(mainReducer, preloadedState, composeWithDevTools(applyMiddleware(thunk, createLogger())));

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        {routes}
      </Switch>
    </BrowserRouter>
  </Provider>
);

onPageLoad(() => {
  ReactDOM.hydrate(<App />, document.getElementById('app'));
});
