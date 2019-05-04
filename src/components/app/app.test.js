import React from 'react';
import App from './app.jsx';
import renderer from 'react-test-renderer';

describe(`App`, () => {
  it(`renders correctly`, () => {
    const app = renderer
    .create(
        <App
          mistakesCount={0}
          gameTime={0}
          onPlayButtonClick={jest.fn()}
        />
    ).toJSON();

    expect(app).toMatchSnapshot();
  });
});
