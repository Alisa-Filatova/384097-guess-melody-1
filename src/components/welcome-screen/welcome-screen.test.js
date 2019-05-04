import React from 'react';
import WelcomeScreen from './welcome-screen.jsx';
import renderer from 'react-test-renderer';

describe(`WelcomeScreen`, () => {
  it(`renders correctly`, () => {
    const screen = renderer
    .create(
        <WelcomeScreen
          mistakesCount={0}
          time={0}
          onPlayButtonClick={jest.fn()}
        />
    ).toJSON();

    expect(screen).toMatchSnapshot();
  });
});
