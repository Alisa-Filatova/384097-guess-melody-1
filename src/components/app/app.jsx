import React from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen.jsx';
import QuestionGenreScreen from '../genre-question-screen/genre-question-screen.jsx';
import GameWrapper from '../game-wrapper/game-wrapper.jsx';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      questionIdx: -1,
    };
  }

  render() {
    const {questions, mistakesCount, gameTime} = this.props;
    const {questionIdx} = this.state;
    const nextQuestionIdx = questionIdx + 1 >= questions.length ? -1 : questionIdx + 1;

    return (
      <>
        {questions[questionIdx] ?
          <GameWrapper questionType={questions[questionIdx].type}>
            {this._getGameScreen(questions[questionIdx], () => {
              this.setState({questionIdx: nextQuestionIdx});
            })}
          </GameWrapper>
          :
          <WelcomeScreen
            time={gameTime}
            mistakesCount={mistakesCount}
            onPlayButtonClick={() => {
              this.setState({questionIdx: nextQuestionIdx});
            }}
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
    }

    return null;
  }
}

App.propTypes = {
  mistakesCount: PropTypes.number.isRequired,
  gameTime: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object),
};

export default App;

