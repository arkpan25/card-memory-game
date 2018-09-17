import React from 'react';

const Restart = ({restart}) => {

    return (
		<div className="restart" id="restart">
			<span id="restart-text">Restart: </span>
			<i onClick = {restart} className="fa fa-repeat grow-large"></i>
		</div>

    )

}

export default Restart;