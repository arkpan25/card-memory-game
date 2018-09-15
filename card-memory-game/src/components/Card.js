import React from 'react';


const Card = ({cardName,index,id,key}) => {

	return (
			<li><i className={`card fa ${cardName}`} ></i></li>
		);
}




export default Card;