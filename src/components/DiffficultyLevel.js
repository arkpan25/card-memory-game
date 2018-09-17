import React from 'react';

const DifficultyLevel = ({DiffficultyLevel,changeDifficulty}) => {

    return (
        <div>
			<span className = "red pa1" > Diffficulty Level :</span>
			<a onClick={() => changeDifficulty("Easy") } name="Easy" 
                className=	{`pa2 hover-green black grow pointer 
			${DiffficultyLevel === "Easy" ? "green underline": " "}`}>Easy</a>
            <a onClick={() => changeDifficulty("Hard")} name="Hard" 
                className={`pa2 hover-red black grow pointer 
			${DiffficultyLevel === "Easy" ? " ": "red underline"}`}>Hard</a>
		</div>
    )

}

export default DifficultyLevel;