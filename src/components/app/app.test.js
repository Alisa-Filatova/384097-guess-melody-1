import React from 'react';
import App from './app.jsx';
import renderer from 'react-test-renderer';

const mock = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `path`,
        genre: `rock`,
      },
    ],
  },
  {
    type: `artist`,
    song: {
      artist: `One`,
      src: ``,
    },
    answers: [
      {
        picture: ``,
        artist: `One`,
      },
    ],
  }
];

describe(`App`, () => {
  it(`renders correctly`, () => {
    const app = renderer
    .create(
        <App
          mistakesCount={0}
          gameTime={0}
          questions={mock}
        />
    ).toJSON();

    expect(app).toMatchSnapshot();
  });
});
