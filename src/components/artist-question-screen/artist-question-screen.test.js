import React from 'react';
import renderer from 'react-test-renderer';
import ArtistQuestionScreen from './artist-question-screen.jsx';

const mock = {
  question: {
    type: `artist`,
    song: {
      artist: `Jim Beam`,
      src: `path.mp3`,
    },
    answers: [
      {
        picture: `path.jpg`,
        artist: `John Snow`,
      },
      {
        picture: `path.jpg`,
        artist: `Jack Daniels`,
      },
      {
        picture: `path.jpg`,
        artist: `Jim Beam`,
      },
    ],
  },
};

describe(`ArtistQuestionScreen`, () => {
  it(`renders correctly`, () => {
    const {question} = mock;
    const onAnswer = jest.fn();

    const screen = renderer.create(
        <ArtistQuestionScreen
          onAnswer={onAnswer}
          question={question}
        />, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

    expect(screen).toMatchSnapshot();
  });
});

