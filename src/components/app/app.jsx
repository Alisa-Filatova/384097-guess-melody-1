import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {checkIsGameOver, ActionCreator} from '../../reducer';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen.jsx';
import QuestionGenreScreen from '../genre-question-screen/genre-question-screen.jsx';
import GameWrapper from '../game-wrapper/game-wrapper.jsx';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {questions, step, settings, onAnswer} = this.props;

    checkIsGameOver(settings.mistakesCount, questions.length, step);

    return (
      <>
        {questions[step] ?
          <GameWrapper
            questionType={questions[step].type}
            mistakesCount={settings.mistakesCount}
          >
            {this._getGameScreen(questions[step], (answer) =>
              onAnswer(questions[step], answer)
            )}
          </GameWrapper>
          :
          <WelcomeScreen
            time={settings.gameTime}
            mistakesCount={settings.mistakesCount}
            onPlayButtonClick={onAnswer}
          />
        }
      </>
    );
  }

  _getGameScreen(question, onAnswer) {
    switch (question.type) {
      case `genre`:
        return (
          <QuestionGenreScreen
            question={question}
            onAnswer={onAnswer}
            userAnswer={onAnswer}
            onChange={onAnswer}
          />
        );

      case `artist`:
        return (
          <ArtistQuestionScreen
            question={question}
            onAnswer={onAnswer}
          />
        );

      default: return null;
    }
  }
}

App.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  step: PropTypes.number.isRequired,
  onAnswer: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    gameTime: PropTypes.number.isRequired,
    mistakesCount: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, state);
const mapDispatchToProps = (dispatch) => {
  return {
    onAnswer: (question, userAnswer) => {
      dispatch(ActionCreator.incrementStep());
      dispatch(ActionCreator.incrementMistake(question, userAnswer));
    },
    checkGameStatus: (gameMistakes, numberOfQuestions, currentMistakes, currentStep) => {
      if (checkIsGameOver(gameMistakes, numberOfQuestions, currentMistakes, currentStep)) {
        dispatch(ActionCreator.resetGame());
      }
    },
    resetGame: () => {
      dispatch(ActionCreator.resetGame());
    }
  };
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);


