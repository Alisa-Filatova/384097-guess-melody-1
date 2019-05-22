import React from 'react';
import Proptypes from 'prop-types';

const MistakesBoard = ({mistakesCount}) => (
  <div className="game__mistakes">
    {Array.from({length: mistakesCount}, (mistake, idx) => (
      <div className="wrong" key={`mistake-${idx}`} />
    ))}
  </div>
);

MistakesBoard.propTypes = {
  mistakesCount: Proptypes.number.isRequired,
};

export default MistakesBoard;
