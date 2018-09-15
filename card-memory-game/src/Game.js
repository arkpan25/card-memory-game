import React,{Component} from 'react';
import "./components/GameBoard";
import { GameBoard } from './components/GameBoard';


export class Game extends Component {

	constructor(props) {
		super(props);

	}
	render () {
		return (
			<div>
				 <section className="score-panel">
			          <div className="star-rating">
			        	  <ul className="stars">
			        		  <li><i className="fa fa-star" id="starThree"></i></li>
			        		  <li><i className="fa fa-star" id="starTwo"></i></li>
			        		  <li><i className="fa fa-star" id="starOne"></i></li>
			          	</ul>

			          	<span className="moves" id="moves">0</span><span> Moves</span>
			          </div>
			          <div id="timer"><span id="timer-text">Timer: </span>
			            <label >00</label>:<label >00</label></div>
			          <div className="restart" id="restart">
			        		<span id="restart-text">Restart: </span><i className="fa fa-repeat"></i>
			          </div>
        		</section>	
					<GameBoard/>			
			</div>
			)
	}

}

export default Game