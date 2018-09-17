import React , {Component} from 'react';
import PropTypes from 'prop-types';

export class Timer extends Component {

    componentDidMount(){        
        this.props.onRef(this)
    }

    constructor(props) {
        super(props);
        this.state = {
            seconds: "00",
            minutes: "00",
            start: 0
        }
    }
    format  = (val) => val > 9 ? val : "0" + val

    startTimer = () => {
        let {seconds,minutes,start} = this.state;
        this.timer = setInterval(() => {
            seconds = this.format(++start % 60);
            minutes = this.format(parseInt( start / 60, 10));    
            this.setState({seconds,minutes,start});       
        }, 1000)
        
    }

    timerStop = () => clearInterval(this.timer)

    resetTimer = () => {
        clearInterval(this.timer);
        this.setState({
            seconds: "00",
            minutes: "00",
            start: 0
        });
    }

    render () {
        const {seconds,minutes} = this.state;
        return (
                <div id="timer dib">
                    <span id="timer-text" style = {{color: '#058A8c'}}>Timer: </span>
			         <label >{minutes}</label>:<label >{seconds}</label>
                </div>
        )
        
    }

}

Timer.propTypes = {
    onRef: PropTypes.func.isRequired
}

export default Timer;