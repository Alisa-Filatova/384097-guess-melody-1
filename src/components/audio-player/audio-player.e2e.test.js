import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AudioPlayer from './audio-player.jsx';

configure({adapter: new Adapter()});

const mock = {
  src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
  isPlaying: false,
};

it(`AudioPlayer switch isPlaying state`, () => {
  window.HTMLMediaElement.prototype.pause = () => {};
  const onPlayButtonHandler = jest.fn();

  const player = mount(
      <AudioPlayer
        src={mock.src}
        isPlaying={mock.isPlaying}
        onPlayButtonClick={onPlayButtonHandler}
      />
  );

  player.setState({isLoading: false});

  const playButton = player.find(`.track__button`);

  playButton.simulate(`click`);
  expect(player.state(`isPlaying`)).toEqual(true);

  playButton.simulate(`click`);
  expect(player.state(`isPlaying`)).toEqual(false);
});
