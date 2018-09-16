import React from 'react';


const Card = (props) => {

	const {cardName, id, handleClick, isMatch,isSelected} = props;
	const turned = isSelected || isMatch ? 'flipInY open show' : '';

	const matched = isMatch ? "match":" ";
	return (
		<div id={id} onClick={handleClick.bind(this)}>
			<li><i className={`card fa grow ${cardName} ${turned} ${matched}`} ></i></li>
		</div>
			
		);
}




export default Card;