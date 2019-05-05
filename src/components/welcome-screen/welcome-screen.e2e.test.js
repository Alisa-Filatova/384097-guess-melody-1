import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WelcomeScreen from './welcome-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`Play button should handle the click event`, () => {
  const playButtonClickHandler = jest.fn();

  const screen = shallow(
      <WelcomeScreen
        time={0}
        mistakesCount={0}
        onPlayButtonClick={playButtonClickHandler}
      />
  );

  screen.find(`button`).simulate(`click`);

  expect(playButtonClickHandler).toHaveBeenCalledTimes(1);
});
