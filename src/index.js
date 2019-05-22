import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './components/app/app.jsx';
import questions from './mocks/questions';
import gameSettings from './mocks/game-settings';
import {reducer} from './reducer';

const init = (gameQuestions) => {
  const store = createStore(reducer);

  ReactDOM.render(
      <Provider store={store}>
        <App
          questions={gameQuestions}
          settings={gameSettings}
        />
      </Provider>,
      document.querySelector(`.main`)
  );
};

init(questions);
