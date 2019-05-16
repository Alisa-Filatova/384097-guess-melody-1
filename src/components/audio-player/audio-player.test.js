import React from 'react';
import renderer from 'react-test-renderer';
import AudioPlayer from './audio-player';

const mock = {
  src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
  isPlaying: false,
};

describe(`AudioPlayer`, () => {
  it(`renders correctly`, () => {
    const onPlayButtonHandler = jest.fn();

    const player = renderer.create(
        <AudioPlayer
          src={mock.src}
          isPlaying={mock.isPlaying}
          onPlayButtonClick={onPlayButtonHandler}
        />, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

    expect(player).toMatchSnapshot();
  });
});
