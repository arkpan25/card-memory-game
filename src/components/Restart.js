import React from 'react';

const Restart = ({restart}) => {

    return (
		<div className="restart pointer" id="restart" >
			<span style = {{color: '#764F92'}}>Restart: </span>
			<i onClick = {restart} className="fa fa-repeat grow-large pl1"></i>
		</div>

    )

}

export default Restart;