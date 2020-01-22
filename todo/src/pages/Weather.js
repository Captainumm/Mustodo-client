import React from 'react';

class Weather extends React.Component {
	state = {
		weather: ''
	};
	componentDidMount() {
		const THIS = this;
		const KEY = 'a21e0b907cdebe1e04a31b218da73814';
		fetch(`https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${KEY}&units=metric`)
			.then(function(respond) {
				return respond.json();
			})
			.then(function(json) {
				const TEMP = json.main.temp;
				const NAME = json.name;
				const DES = json.weather[0].description;
				let WEATHER = `${NAME}🌡️${TEMP}🌡️${DES}`;
				THIS.setState({
					weather: WEATHER
				});
			});
	}
	render() {
		return (
			<div className="WeatherBox">
				<h1 className="WeatherH1">{this.state.weather}</h1>
			</div>
		);
	}
}

export default Weather;
