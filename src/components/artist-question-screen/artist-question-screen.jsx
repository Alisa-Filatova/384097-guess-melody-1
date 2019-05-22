import React from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from '../audio-player/audio-player.jsx';

class ArtistQuestionScreen extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };
  }

  render() {
    const {question, onAnswer} = this.props;
    const {isPlaying} = this.state;
    const {answers, song} = question;

    const handleAnswer = (event) => {
      const chosenArtist = event.target.value;

      onAnswer(chosenArtist);
    };

    return (
      <section className="game__screen">
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          <AudioPlayer
            isPlaying={isPlaying}
            onPlayButtonClick={() => this.setState({isPlaying: !isPlaying})}
            src={song.src}
          />
        </div>

        <form
          className="game__artist"
          onChange={handleAnswer}
        >
          {answers.map((answer, idx) => (
            <div className="artist" key={answer.artist}>
              <input
                className="artist__input visually-hidden"
                type="radio"
                name="answer"
                value={`artist-${idx}`}
                id={`artist-${idx}`}
              />
              <label
                className="artist__name"
                htmlFor={`artist-${idx}`}
              >
                <img
                  className="artist__picture"
                  src={answer.picture}
                  alt={answer.artist}
                />
                {answer.artist}
              </label>
            </div>
          ))}
        </form>
      </section>
    );
  }
}

ArtistQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      artist: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    })).isRequired,
    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }).isRequired,
    type: PropTypes.oneOf([`genre`, `artist`]).isRequired,
  }).isRequired,
};

export default ArtistQuestionScreen;
