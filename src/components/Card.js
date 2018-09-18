import React from 'react';
import PropTypes from 'prop-types';

const Card = ({cardName, id, handleClick, isMatch,isSelected} ) => {

	const turned = isSelected || isMatch ? 'flipInY open show' : '';
	const matched = isMatch ? "match":" ";
	return (
		<div id={id} onClick={() => handleClick(id)}>
			<li><i className={`card fa grow ${cardName} ${turned} ${matched}`} ></i></li>
		</div>			
		);
}

Card.propTypes = {
	cardName: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	handleClick: PropTypes.func.isRequired,
	isMatch: PropTypes.bool.isRequired,
	isSelected: PropTypes.bool.isRequired
}




export default Card;