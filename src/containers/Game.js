import React,{Component} from 'react';
import "../components/GameBoard";
import  GameBoard  from '../components/GameBoard';
import Moves from "../components/Moves";
import Score from "../components/Score";
import Restart from "../components/Restart";
import DifficultyLevel from "../components/DifficultyLevel";
import ErrorBoundry from "../components/ErrorBoundry";
import Timer from './Timer';
import "./Game.css"
import {totNum, cardArray} from "../Contants";


export class Game extends Component {

	constructor(props) {
		super(props);
		this.state = this.initialState();
	}

	initialState() {
		// Retrieve BestScore in LocalStore
		let BestScore = localStorage.getItem("BestScore");
		BestScore = BestScore ? JSON.parse(BestScore) : 0;
		return {
			DifficultyLevel: "Hard",
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
	/**
	 * - Restart the Game
	 */
	restart = () => {
		this.child.resetTimer();
		this.setState(this.initialState());
	}
	/**
	 * - @param: the clicked card's id
	 * - Add clicked card id to this.state
	 * - update total click times in this.state
	 */
	cardClickHandler = (cardId) => {		
		const cardSelectedId = this.state.selected.splice(0);
		let clicks = this.state.clicks;	
		if (++clicks === 1) {
			this.child.startTimer();
		}
		// If the card already clicked return directly
		if(cardSelectedId.includes(cardId)||this.state.pairs.includes(cardId)||
		cardSelectedId.length === 2) {
			this.setState({selected:cardSelectedId});
			return;
		}
		cardSelectedId.push(cardId);
		if(cardSelectedId.length === 2) {
			this.checkTime = setTimeout(() => {
				this.checkMatch(cardSelectedId);
			}, 1000);
		} 
		this.setState({selected: cardSelectedId, clicks});
		
    }

	getRandomIdx = (arr) => {	
		return Math.floor(Math.random()*(arr.length));
	}

	onRef = (ref) => {this.child = ref}

	/**
	 * - @param: the number of distinct card 
	 * - pick distinct card of num from the pool
	 * - return the picked card array
	 */
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

	/**
	 * - @param : Array of two selected card id
	 * - Check whether two selected card matched
	 * - Check whether the game is end.
	 */
	checkMatch = (cardSelectedId) => {

		let moves = this.state.moves+1;
		let pairs = this.state.pairs.splice(0);
		let {score,BestScore,DifficultyLevel} = this.state;
		let isMatch = false;
		//  Find the card name of two id
		const cardSelected = cardSelectedId.map((id) => {
			return this.state.deck[id];
		});
		// Check wheter the names are Indentical
		if(cardSelected[0] === cardSelected[1] && cardSelected.length > 0) {
			// If they are add the card ids in the pairs in this.state
			pairs = pairs.concat(cardSelectedId);
			isMatch = true;
		}		
		// Update score according to match status
		score = this.updateScore(score,DifficultyLevel,isMatch);
		this.setState({
			selected: [],
			moves,
			pairs,
			score
		});
		this.checkEnd(BestScore,score);		
	}

	/**
	 * - Check wheter game is end
	 */
	checkEnd = (BestScore,score) => {
		let gameInfo = "";
		if(this.state.pairs.length === this.state.deck.length) {
			if (score > BestScore) {
				BestScore = score;
				gameInfo = 'Congratulations You Win and Broke the Record !!!';
			} else gameInfo = 'Congratulations You Win !';
			this.setState({
				isOn:false,
				gameInfo,
				BestScore
			});
			this.child.timerStop();
			// persist Bestscore in localStore
			localStorage.setItem("BestScore",JSON.stringify(this.state.BestScore));
		}
	}

	updateScore = (score, DifficultyLevel,isMatch) => {
		return isMatch ? DifficultyLevel === "Easy" ? score+20 : score + 50 : score - 2; 
	}
	/**
	 * - Change the DifficultyLevel by changing the number of distinct card on deck.
	 */
	changeDifficulty = (DifficultyLevel) => {
        this.restart();
		if (DifficultyLevel === "Easy"){
			this.setState({deck:this.shuffleDeck(9),DifficultyLevel})
		} else this.setState({deck:this.shuffleDeck(18),DifficultyLevel})          
    }
	/**
	 * - Shuffle the card array randomly
	 */
	shuffleDeck = (num) => {

		let deck = this.pickCards(num);
		for (let i = deck.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[deck[i], deck[j]] = [deck[j], deck[i]];
		}
		return deck;

	}
	render () {
	    const finalScore = this.state.isOn ? " " : " your is final Score is "  + this.state.score
		const {BestScore, gameInfo, deck, selected, pairs, moves, score} = this.state;
		return (
			<div className = "mt4">
				<label className = "f1 yellow" >Best Score:
					<span className = "pl2">{BestScore}</span>
				</label>
				<div className='gameInfo b red'>{gameInfo + finalScore}</div>
				<section className="score-panel">
					<ErrorBoundry>
						<Moves moves = {moves}/>
						<DifficultyLevel DifficultyLevel = {this.state.DifficultyLevel} 
										changeDifficulty = {this.changeDifficulty}/>
						<Score score = {score}/>
						<Restart restart = {this.restart}/>
						<Timer onRef={this.onRef}/>			
					</ErrorBoundry>												
				</section>	
				<ErrorBoundry>
					<GameBoard deck={deck} cardClickHandler={this.cardClickHandler} 
                           selected={selected} pairs={pairs} />	
				</ErrorBoundry>									
	
			</div>
			)
	}

}

export default Game