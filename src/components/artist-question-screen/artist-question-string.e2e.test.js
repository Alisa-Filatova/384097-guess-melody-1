import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ArtistQuestionScreen from './artist-question-screen.jsx';

configure({adapter: new Adapter()});

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

it(`When user answers artist question form is not sent`, () => {
  const {question} = mock;
  const onAnswer = jest.fn();

  const artistQuestion = mount(
      <ArtistQuestionScreen
        onAnswer={onAnswer}
        question={question}
      />
  );

  const form = artistQuestion.find(`form`);
  const formSendPrevention = jest.fn();

  form.simulate(`change`);
  form.simulate(`submit`, {
    preventDefault: formSendPrevention,
  });

  expect(formSendPrevention).toHaveBeenCalledTimes(1);
  expect(onAnswer).toHaveBeenCalledTimes(1);
});
