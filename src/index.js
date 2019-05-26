import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './components/app/app.jsx';
import {reducer} from './reducer';
import questions from './mocks/questions';
import settings from './mocks/game-settings';

const init = () => {
  const store = createStore(reducer);

  ReactDOM.render(
      <Provider store={store}>
        <App questions={questions} settings={settings} />
      </Provider>,
      document.querySelector(`.main`)
  );
};

init();
