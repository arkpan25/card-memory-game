import React from 'react';


const Card = () => {


	return (
			<div className='flip' id={this.props.id} onClick={this.props.handleClick.bind(this)}>
				<div className={turned}>
					<div className={`face back`}> </div>
					<div className={`face front ${this.props.className}`}> </div>
				</div>
			</div>
		);
}




export default Card;