
import React from 'react';
import Card from "./Card";

export const GameBoard=(props)=> {

    const {deck, selected, pairs, clickHandler} = props;
    return (
        <div>
            <ul className="deck">               
            {deck.map((card, i) => 
                <Card  cardName={card} isSelected={selected.includes(i)}
                    isMatch={pairs.includes(i)} id={i} key = {i}
                    handleClick={clickHandler.bind(this, i)}
                />         
           )}
            </ul>
        </div>

    )

    




}