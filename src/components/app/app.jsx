import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen.jsx';
import QuestionGenreScreen from '../genre-question-screen/genre-question-screen.jsx';
import GameWrapper from '../game-wrapper/game-wrapper.jsx';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {questions, step, settings, onAnswer, mistakesCount} = this.props;
    const question = questions[step];
    const userAnswerHandler = (userAnswer) => {
      onAnswer(question, userAnswer, mistakesCount, settings.maxMistakes);
    };

    if (!question && step === questions.length) {
      this.reset();
    }

    return (
      <>
        {questions[step] ?
          <GameWrapper
            questionType={questions[step].type}
            mistakesCount={mistakesCount}
          >
            {this._getGameScreen(question, userAnswerHandler)}
          </GameWrapper>
          :
          <WelcomeScreen
            time={settings.gameTime}
            maxMistakes={settings.maxMistakes}
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
    maxMistakes: PropTypes.number.isRequired,
  }).isRequired,
  mistakesCount: PropTypes.number.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: state.step,
  mistakesCount: state.mistakesCount,
});


const mapDispatchToProps = (dispatch) => ({
  onPlayButtonClick: () => dispatch(ActionCreator.goToNextQuestion()),
  onAnswer: (userAnswer, question, mistakesCount, maxMistakes) => {
    dispatch(ActionCreator.goToNextQuestion());
    dispatch(ActionCreator.checkUserAnswer(userAnswer, question, mistakesCount, maxMistakes));
  },
  reset: () => dispatch(ActionCreator.reset()),
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);


