import React from 'react';

const score = ({score}) => {

    return (
		<div>
			<span className = "blue">Current Score: </span>
            <label className = "green" >{score}</label>
		</div>

    )

}

export default score;