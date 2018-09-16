import React,{Component} from 'react';
import "./components/GameBoard";
import { GameBoard } from './components/GameBoard';

const totNum = 36;
let cardArray = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-gear",  "fa-cube", 
				"fa-leaf",   "fa-bicycle", "fa-bomb","fa-cubes","fa-bank","fa-bug", 
				"fa-birthday-cake","fa-imdb","fa-beer","fa-fighter-jet","fa-flag","fa-flash","fa-car"];

export class Game extends Component {

	constructor(props) {
		super(props);
		this.state = this.initialState();

	}

	initialState() {

        let cardNum=9;
		return {
			DiffficultyLevel: "Hard",
			deck: this.shuffleDeck(cardNum),
			moves: 0,
			score: 0,
			BestScore:0,
			pairs: [],            
			selected: [],
            endMsg:  ''
		};
	}

	restart = () => {
        // this.child.handleResetClick();
        // this.child.handleStartClick();
		this.setState(this.initialState());
	}

	clickHandler = (cardId) => {
		
		const cardSelectedId = this.state.selected.splice(0);
				
		//debugger;
        // if(this.state.moves>1){
        //     this.refs.timer.handleStartClick()
        // }
		// early return in case cards been selected this round or the timer is 'on' || this.resetTime
		if(cardSelectedId.includes(cardId)||this.state.pairs.includes(cardId)
		 || this.state.selected > 1) {
			return;
		}
		cardSelectedId.push(cardId);
		if(cardSelectedId.length === 2) {
			this.resetTime = setTimeout(() => {
				this.checkMatch(cardSelectedId);
			}, 1000);
		} 
		//debugger;
		this.setState({selected: cardSelectedId});
		
    // console.log(cid, 'PROPS', this.state.selected);
		
    }

	getRandomIdx = (arr) => {	
		return Math.floor(Math.random()*(arr.length));
	}

	pickCards = (num) => {

		const deck = [];
		let CardCopy = cardArray.slice(0);
		
		for (let i = 0;i < num; i++) {
			const ranIdx = this.getRandomIdx(CardCopy);
			const cardPick = CardCopy.splice(ranIdx,1)[0];
			for (let eachCardNum =  0; eachCardNum < totNum / num; eachCardNum++) {
				deck.push(cardPick);
			}
		}

		return deck;
	}

	checkMatch = (cardSelectedId) => {

		let moves = this.state.moves+1;
		let pairs = this.state.pairs.splice(0);
		let {score,BestScore,DiffficultyLevel} = this.state;
		let isMatch = false;

		const cardSelected = cardSelectedId.map((id) => {
			return this.state.deck[id];
		});

		if(cardSelected[0] === cardSelected[1] && cardSelected.length > 0) {
			pairs = pairs.concat(cardSelectedId);
			debugger;
			isMatch = true;
		}
		score = this.updateScore(score,DiffficultyLevel,isMatch);

		//debugger;
		this.setState({
			selected: [],
			moves,
			pairs,
			score
		});
		// this.resetTime = null;
        // console.log(this.state.pairs.length)
		if(this.state.pairs.length === this.state.deck.length) {
			this.setState({
				endMsg: 'You win !!!!'
			});
            alert("You Win. Game will restart in 5 seconds")
			const newGame = setTimeout(() => {
				this.restart();
			}, 5000);
		}
	}

	updateScore = (score, DiffficultyLevel,isMatch) => {
		return isMatch ? DiffficultyLevel === "Easy" ? score+20 : score + 50 : score - 2; 
	}
	
	changeDifficulty = (DiffficultyLevel) => {
        this.restart();
		if (DiffficultyLevel === "Easy"){
			this.setState({deck:this.shuffleDeck(9),DiffficultyLevel})
		} else this.setState({deck:this.shuffleDeck(18),DiffficultyLevel})        
    //   console.log(this.state)     
    }
	
	shuffleDeck = (num) => {

		let deck = this.pickCards(num);
		for (let i = deck.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[deck[i], deck[j]] = [deck[j], deck[i]];
		}
		return deck;

	}
	render () {
		//debugger;
		const gameboard = <GameBoard deck={this.state.deck} 
                                     clickHandler={this.clickHandler.bind(this)} 
                                     selected={this.state.selected}
                                     pairs={this.state.pairs} />
		return (
			<div className = "mt4">
				<label className = "f1 yellow" >Best Score:<span>{this.state.BestScore}</span></label>
				 <section className="score-panel">
			          <div className="moves">
			          	<span className="moves" id="moves">{this.state.moves}</span><span> Moves</span>
			          </div>
					  <div>
					  	<span className = "red pa1"> Diffficulty Level :</span>
					  	<a onClick={() => this.changeDifficulty("Easy") } name="Easy" 
                           className="pa2 hover-green black grow pointer">Easy</a>
                        <a onClick={() => this.changeDifficulty("Hard")} name="Hard" 
                           className="pa2 hover-red black grow pointer ">Hard</a>
					  </div>
					  <div>
						  <span className = "blue">Current Score: </span><label className = "green" >{this.state.score}</label>
					  </div>
			          <div id="timer"><span id="timer-text">Timer: </span>
			            <label >00</label>:<label >00</label></div>
			          <div className="restart" id="restart">
			        		<span id="restart-text">Restart: </span>
							<i onClick = {this.restart} className="fa fa-repeat grow-large"></i>
			          </div>
        		</section>	
			    {gameboard}			
			</div>
			)
	}

}

export default Game