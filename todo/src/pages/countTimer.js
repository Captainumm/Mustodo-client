import React from 'react';
import './countTimer.css';
class CountTimer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			min: 0,
			sec: '00',
			running: false
		};
	}
	handleClick() {
		if (this.state.running) {
			clearInterval(this.timer);
			this.setState({ running: false });
		} else {
			this.timer = setInterval(() => {
				var secNew = Number(this.state.sec);
				var secStringNew = '';
				var minNew = this.state.min;
				if (secNew == 59) {
					secStringNew = '00';
					minNew++;
				} else {
					secNew++;
					if (secNew < 10) {
						secStringNew = '0' + secNew;
					} else {
						secStringNew = secNew;
					}
				}
				this.setState({ sec: secStringNew, min: minNew, running: true });
			}, 1000);
		}
	}
	initialisate() {
		this.setState({ sec: '00', min: 0, running: false });
	}
	render() {
		return (
			<div className="timerBox">
				<h1>STOPWATCH</h1>
				<p>
					{this.state.min}:{this.state.sec}
				</p>
				<button className="TimerButton" onClick={() => this.handleClick()}>
					{this.state.running ? 'Stop' : 'Start'}
				</button>
				<button className="TimerButton" onClick={() => this.initialisate()}>
					Zero
				</button>
			</div>
		);
	}
}

export default CountTimer;
