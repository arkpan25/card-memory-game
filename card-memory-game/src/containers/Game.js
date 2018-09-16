import React,{Component} from 'react';
import "../components/GameBoard";
import { GameBoard } from '../components/GameBoard';
import Timer from './Timer';

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

		let BestScore = localStorage.getItem("BestScore");
		BestScore = BestScore ? JSON.parse(BestScore) : 0;
		return {
			DiffficultyLevel: "Hard",
			deck: this.shuffleDeck(18),
			isOn: true,
			moves: 0,
			score: 0,
			clicks:0,
			BestScore,
			pairs: [],            
			selected: [],
            gameInfo:  ''
		};
	}

	restart = () => {
		this.child.resetTimer();
		this.setState(this.initialState());
	}

	clickHandler = (cardId) => {
		
		const cardSelectedId = this.state.selected.splice(0);
		let clicks = this.state.clicks;	
		if (++clicks === 1) {
			this.child.startTimer();
			//debugger;
		}
		if(cardSelectedId.includes(cardId)||this.state.pairs.includes(cardId)) {
			return;
		}
		cardSelectedId.push(cardId);
		if(cardSelectedId.length === 2) {
			this.checkTime = setTimeout(() => {
				this.checkMatch(cardSelectedId);
			}, 1000);
		} 
		//debugger;
		this.setState({selected: cardSelectedId,clicks});
		
    }

	getRandomIdx = (arr) => {	
		return Math.floor(Math.random()*(arr.length));
	}

	onRef = (ref) => {this.child = ref}

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
			//debugger;
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
		this.checkEnd(BestScore,score);		
	}

	checkEnd = (BestScore,score) => {
		let gameInfo = "";
		if(this.state.pairs.length === this.state.deck.length) {
			if (score > BestScore) {
				BestScore = score;
				gameInfo = 'Congratulations You Broke the Record !!!';
			} else gameInfo = 'Congratulations You win !';
			this.setState({
				isOn:false,
				gameInfo,
				BestScore
			});
			this.child.timerStop();
			localStorage.setItem("BestScore",JSON.stringify(this.state.BestScore));
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
	    const finalScore = this.state.isOn ? " " : " your is final Score is "  + this.state.score
		return (
			<div className = "mt4">
				<label className = "f1 yellow" >Best Score:<span>{this.state.BestScore}</span></label>
				<div className='gameInfo b red'>{ this.state.gameInfo + finalScore}</div>
				 <section className="score-panel">
			          <div className="moves">
			          	<span className="moves" id="moves">{this.state.moves}</span><span> Moves</span>
			          </div>
					  <div>
					  	<span className = "red pa1" > Diffficulty Level :</span>
					  	<a onClick={() => this.changeDifficulty("Easy") } name="Easy" 
                           className=	{`pa2 hover-green black grow pointer 
						   ${this.state.DiffficultyLevel === "Easy" ? "green underline": " "}`}>Easy</a>
                        <a onClick={() => this.changeDifficulty("Hard")} name="Hard" 
                           className={`pa2 hover-red black grow pointer 
						   ${this.state.DiffficultyLevel === "Easy" ? " ": "red underline"}`}>Hard</a>
					  </div>
					  <div>
						  <span className = "blue">Current Score: </span><label className = "green" >{this.state.score}</label>
					  </div>
			          <Timer onRef={this.onRef}/>
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