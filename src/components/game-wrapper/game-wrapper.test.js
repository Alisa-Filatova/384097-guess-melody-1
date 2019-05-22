import React from 'react';
import renderer from 'react-test-renderer';
import GameWrapper from '../game-wrapper/game-wrapper';

describe(`GameWrapper`, () => {
  it(`renders correctly`, () => {
    const wrapper = renderer
    .create(
        <GameWrapper questionType="genre" mistakesCount={3}>
          <div>Mock Node</div>
        </GameWrapper>
    ).toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
