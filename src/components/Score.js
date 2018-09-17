import React from 'react';
import PropTypes from 'prop-types';

const Score = ({score}) => {

    return (
		<div>
			<span className = "blue">Current Score: </span>
            <label className = "green" >{score}</label>
		</div>

    )

}

Score.propTypes = {
    score : PropTypes.number.isRequired
}

export default Score;