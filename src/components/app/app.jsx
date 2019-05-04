import React from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';

const App = (props) => {
  const {gameTime, mistakesCount, onPlayButtonClick} = props;

  return (
    <WelcomeScreen
      time={gameTime}
      mistakesCount={mistakesCount}
      onPlayButtonClick={onPlayButtonClick}
    />
  );
};

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  mistakesCount: PropTypes.number.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
};

export default App;
