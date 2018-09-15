
import React from 'react';
import Card from "./Card";

export const GameBoard=()=> {

    let deck = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", 
                "fa-anchor", "fa-anchor", "fa-gear", "fa-gear", "fa-cube", "fa-cube", 
                "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle","fa-bomb", "fa-bomb",
                "fa-university","fa-university","fa-bank","fa-bank","fa-bug", "fa-bug",
                "fa-bolt","fa-bolt","fa-bomb","fa-bomb","fa-beer","fa-beer","fa-cab",
                "fa-cab","fa-flag","fa-flag","fa-flash","fa-flash","fa-car","fa-car"];

    return (
        <div>
            <ul class="deck">               
            {deck.map((card, i) => 
                <Card  cardName={card}
                    index={i} id={i} key={i}
                />         
           )}
            </ul>
        </div>

    )

    




}