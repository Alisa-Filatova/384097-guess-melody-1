import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './app';

configure({adapter: new Adapter()});

const mock = {
  questions: [
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
  ],
};

it(`On click on WelcomeScreen App switches to the first question`, () => {
  const {questions} = mock;
  const app = mount(
      <App
        mistakesCount={0}
        gameTime={0}
        questions={questions}
      />
  );

  expect(app.state(`questionIdx`)).toEqual(-1);

  const button = app.find(`button`);

  button.simulate(`click`);
  app.update();
  expect(app.state(`questionIdx`)).toEqual(0);
});


it(`Question answer switches to another question`, () => {
  const {questions} = mock;
  const app = mount(
      <App
        mistakesCount={0}
        gameTime={0}
        questions={questions}
      />
  );

  app.setState({questionIdx: 0});
  app.update();

  const form = app.find(`form`);
  form.simulate(`submit`, {
    preventDefault() {},
  });

  expect(app.state(`questionIdx`)).toEqual(1);
});


it(`Last question answer leads to the first screen`, () => {
  const {questions} = mock;
  const app = mount(
      <App
        mistakesCount={0}
        gameTime={0}
        questions={questions}
      />
  );

  app.setState({questionIdx: questions.length - 1});
  app.update();

  const form = app.find(`form`);

  form.simulate(`change`, {
    preventDefault() {}
  });

  expect(app.state(`questionIdx`)).toEqual(-1);
});
