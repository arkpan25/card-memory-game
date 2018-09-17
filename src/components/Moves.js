import React from 'react';

const Moves = ({moves}) => {

    return (
        <div className="moves">
			<span className="moves" id="moves">{moves}</span><span> Moves</span>
		</div>

    )

}

export default Moves;