import React from 'react';
import PropTypes from 'prop-types';

const Moves = ({moves}) => {

    return (
        <div className="moves">
			<span className="moves" id="moves">{moves}</span><span> Moves</span>
		</div>

    )

}

Moves.propTypes = {
    moves: PropTypes.number.isRequired
}

export default Moves;