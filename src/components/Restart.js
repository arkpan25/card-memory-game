import React from 'react';
import PropTypes from 'prop-types';
const Restart = ({restart}) => {

    return (
		<div className="restart pointer" id="restart" >
			<span style = {{color: '#764F92'}}>Restart: </span>
			<i onClick = {restart} className="fa fa-repeat grow-large pl1"></i>
		</div>

    )

}

Restart.propTypes = {
	restart: PropTypes.func.isRequired
}

export default Restart;