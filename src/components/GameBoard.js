
import React from 'react';
import Card from "./Card";

const GameBoard=(props)=> {

    const {deck, selected, pairs, cardClickHandler} = props;
    return (
        <div>
            <ul className="deck">               
            {deck.map((card, i) => 
                <Card  cardName={card} isSelected={selected.includes(i)}
                    isMatch={pairs.includes(i)} id={i} key = {i}
                    handleClick={cardClickHandler.bind(this, i)}
                />         
           )}
            </ul>
        </div>

    )
}

export default GameBoard;