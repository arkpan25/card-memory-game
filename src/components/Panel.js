import React from 'react';

const Panel = (props) => {

    const {moves,DifficultyLevel,score,restart,changeDifficulty} = props

    return (
        <section className="score-panel">
			<div className="moves">
			    <span className="moves" id="moves">{moves}</span><span> Moves</span>
			</div>
			<div>
				<span className = "red pa1" > Difficulty Level :</span>
				<a onClick={() => changeDifficulty("Easy") } name="Easy" 
                    className=	{`pa2 hover-green black grow pointer 
				 ${DifficultyLevel === "Easy" ? "green underline": " "}`}>Easy</a>
                <a onClick={() => changeDifficulty("Hard")} name="Hard" 
                     className={`pa2 hover-red black grow pointer 
				${DifficultyLevel === "Easy" ? " ": "red underline"}`}>Hard</a>
			</div>
			<div>
				<span className = "blue">Current Score: </span><label className = "green" >{score}</label>
			</div>
			<div className="restart" id="restart">
			    <span id="restart-text">Restart: </span>
				<i onClick = {restart} className="fa fa-repeat grow-large"></i>
			</div>
        </section>	

    )


}


export default Panel;