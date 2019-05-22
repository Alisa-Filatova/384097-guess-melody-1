const initialState = {
  step: -1,
  mistakesCount: 0,
};

const ActionType = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_STEP: `INCREMENT_STEP`,
  RESET: `RESET`,
};

const isArtistAnswerCorrect = (userAnswer, question) =>
  userAnswer.artist === question.song.artist;


const isGenreAnswerCorrect = (userAnswer, question) =>
  userAnswer.every((item, idx) => item === (
    question.answers[idx].genre === question.genre
  ));

const checkIsGameOver = (gameMistakes, numberOfQuestions, currentMistakes, currentStep) => {
  return currentMistakes >= gameMistakes || currentStep >= numberOfQuestions;
};

const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  }),

  incrementMistake: (userAnswer, question, mistakesCount, maxMistakes) => {
    let answerIsCorrect = false;

    switch (question.type) {
      case `artist`:
        answerIsCorrect = isArtistAnswerCorrect(userAnswer, question);
        break;
      case `genre`:
        answerIsCorrect = isGenreAnswerCorrect(userAnswer, question);
        break;
    }

    if (!answerIsCorrect && mistakesCount + 1 >= maxMistakes) {
      return {
        type: ActionType.RESET,
      };
    }

    return {
      type: ActionType.INCREMENT_MISTAKES,
      payload: answerIsCorrect ? 0 : 1,
    };
  },

  resetGame: () => {
    return {
      type: ActionType.RESET
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP: return Object.assign({}, state, {
      step: state.step + action.payload,
    });

    case ActionType.INCREMENT_MISTAKES: return Object.assign({}, state, {
      mistakesCount: state.mistakesCount + action.payload,
    });

    case ActionType.RESET: return Object.assign({}, initialState);
  }

  return state;
};


export {
  ActionCreator,
  ActionType,
  checkIsGameOver,
  isArtistAnswerCorrect,
  isGenreAnswerCorrect,
  reducer,
};
