
import React from 'react';
import PropTypes from 'prop-types';
import Card from "./Card";
import "./GameBoard.css"

const GameBoard=({deck, selected, pairs, cardClickHandler})=> {

    return (
        <div>
            <ul className="deck">               
            {deck.map((card, i) => 
                <Card  cardName={card} isSelected={selected.includes(i)}
                    isMatch={pairs.includes(i)} id={i} key = {i}
                    handleClick={cardClickHandler}
                />         
           )}
            </ul>
        </div>

    )
}

GameBoard.propTypes = {
    deck: PropTypes.array.isRequired,
    selected: PropTypes.array.isRequired,
    pairs: PropTypes.array.isRequired,
    cardClickHandler: PropTypes.func.isRequired
  };

export default GameBoard;