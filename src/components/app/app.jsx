import React from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';

const App = (props) => {
  const {gameTime, mistakesCount} = props;

  return (
    <WelcomeScreen
      time={gameTime}
      mistakesCount={mistakesCount}
    />
  );
};

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  mistakesCount: PropTypes.number.isRequired,
};

export default App;
