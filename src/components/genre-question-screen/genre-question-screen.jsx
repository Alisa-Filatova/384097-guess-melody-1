import React from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from '../audio-player/audio-player.jsx';

class GenreQuestionScreen extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      activePlayer: -1,
      answer: new Array(this.props.question.answers.length).fill(false),
    };
  }

  render() {
    const {question, onAnswer} = this.props;
    const {answers, genre} = question;
    const {activePlayer} = this.state;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={(event) => {
            event.preventDefault();
            onAnswer();
          }}
        >
          {answers.map(({src}, idx) => (
            <div className="track" key={`answer-${idx}`}>
              <AudioPlayer
                src={src}
                isPlaying={idx === activePlayer}
                onPlayButtonClick={() => this.setState({
                  activePlayer: activePlayer === idx ? -1 : idx
                })}
              />
              <div className="game__answer">
                <input
                  className="game__input visually-hidden"
                  type="checkbox"
                  name="answer"
                  value={`answer-${idx}`}
                  id={`answer-${idx}`}
                  onChange={() => this._onChangeCheckboxHandler(idx)}
                />
                <label
                  className="game__check"
                  htmlFor={`answer-${idx}`}
                >
                  Отметить
                </label>
              </div>
            </div>
          ))}
          <button
            className="game__submit button"
            type="submit"
          >
            Ответить
          </button>
        </form>
      </section>
    );
  }

  _onChangeCheckboxHandler(idx) {
    const answer = [...this.state.answer];

    answer[idx] = !answer[idx];
    this.setState({answer});
  }
}

GenreQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.oneOf([`rock`, `jazz`, `blues`]).isRequired,
    })).isRequired,
    genre: PropTypes.oneOf([`rock`, `jazz`, `blues`]).isRequired,
    type: PropTypes.oneOf([`genre`, `artist`]).isRequired,
  }).isRequired,
};

export default GenreQuestionScreen;
