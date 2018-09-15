import React,{Component} from 'react'

export class Game extends Component {

	constructor(props) {
		super(props);

	}

	render () {


		return (
			<div>
				 <section class="score-panel">
			          <div class="star-rating">
			        	  <ul class="stars">
			        		  <li><i class="fa fa-star" id="starThree"></i></li>
			        		  <li><i class="fa fa-star" id="starTwo"></i></li>
			        		  <li><i class="fa fa-star" id="starOne"></i></li>
			          	</ul>

			          	<span class="moves" id="moves">0</span><span id="movesText"> Moves</span>
			          </div>
			          <div id="timer"><span id="timer-text">Timer: </span>
			            <label class="minutes">00</label>:<label class="seconds">00</label></div>
			          <div class="restart" id="restart">
			        		<span id="restart-text">Restart: </span><i class="fa fa-repeat"></i>
			        	</div>
        			</section>				
			</div>
			)

	}

}

export default Game