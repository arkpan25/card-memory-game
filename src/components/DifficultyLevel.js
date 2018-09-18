import React from 'react';
import PropTypes from 'prop-types';

const DifficultyLevel = ({DifficultyLevel,changeDifficulty}) => {

    return (
        <div>
			<span className = "red pa1" > Difficulty Level :</span>
			<a onClick={() => changeDifficulty("Easy") } name="Easy" 
                className=	{`pa2 hover-green black grow pointer 
			${DifficultyLevel === "Easy" ? "green underline": " "}`}>Easy</a>
            <a onClick={() => changeDifficulty("Hard")} name="Hard" 
                className={`pa2 hover-red black grow pointer 
			${DifficultyLevel === "Easy" ? " ": "red underline"}`}>Hard</a>
		</div>
    )

}

DifficultyLevel.propTypes = {
    DifficultyLevel: PropTypes.string.isRequired,
    changeDifficulty: PropTypes.func.isRequired
}

export default DifficultyLevel;