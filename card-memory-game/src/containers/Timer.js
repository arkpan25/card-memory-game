import React , {Component} from 'react';


export class Timer extends Component {

    componentDidMount(){
        this.props.onRef(this)
    }

    constructor(props) {
        super(props);
        this.state = {
            seconds: 0,
            minutes: 0,
        }
        this.start = 0;
    }
    format  = (val) => val > 9 ? val : "0" + val

    startTimer = () => {
        let {seconds,minutes} = this.state;
        this.timer = setInterval(() => {
            seconds = this.format(++this.start % 60);
            minutes = this.format(parseInt(this.start / 60, 10));    
            this.setState({seconds,minutes});       
        }, 1000)
        
    }

    resetTimer = () => {
        clearInterval(this.timer);
        this.setState({
            seconds: 0,
            minutes: 0,
        });
        this.start = 0;
    }

    render () {
        const {seconds,minutes} = this.state;
        return (
                <div id="timer">
                    <span id="timer-text">Timer: </span>
			         <label >{minutes}</label>:<label >{seconds}</label>
                </div>
        )
        
    }

}

export default Timer;