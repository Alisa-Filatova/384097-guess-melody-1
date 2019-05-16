import React from 'react';
import renderer from 'react-test-renderer';
import GenreQuestionScreen from './genre-question-screen.jsx';

const mock = {
  question: {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `test.mp3`,
        genre: `rock`,
      },
      {
        src: `test.mp3`,
        genre: `blues`,
      },
      {
        src: `test.mp3`,
        genre: `jazz`,
      },
      {
        src: `test.mp3`,
        genre: `rock`,
      },
    ],
  },
};

describe(`GenreQuestionScreen`, () => {
  it(`renders correctly`, () => {
    const {question} = mock;
    const onAnswer = jest.fn();

    const screen = renderer.create(
        <GenreQuestionScreen
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
