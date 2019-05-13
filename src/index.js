import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import questions from './mocks/questions';
import gameSettings from './mocks/game-settings';

const init = (gameQuestions) => {
  const {mistakesCount, gameTime} = gameSettings;

  ReactDOM.render(
      <App
        gameTime={gameTime}
        mistakesCount={mistakesCount}
        questions={gameQuestions}
      />,
      document.querySelector(`.main`)
  );
};

init(questions);
