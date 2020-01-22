import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Homepage from '../src/pages/homepage';
import Login from '../src/pages/login';
import Mypage from '../src/pages/mypage';
import Signup from '../src/pages/signup';
import Todopage from '../src/pages/todopage';
import Timer from '../src/pages/timer';
import LoggedInHomepage from '../src/pages/loggedInHomepage';
import NotLoggedIn from '../src/pages/notLoggedIn';
axios.defaults.withCredentials = true;
class App extends React.Component {
	state = {
		isLogin: false
	};
	handleIsLoginChange = () => {
		this.setState({ isLogin: true });
	};
	logOut = () => {
		axios
			.get('http://localhost:4000/user/logout')
			.then(res => {
				this.setState({ isLogin: false });
			})
			.catch(err => console.log(err));
	};
	render() {
		const { isLogin } = this.state;
		return (
			<>
				{/* <Timer /> */}
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => {
								return <Homepage isLogin={isLogin} />;
							}}
						/>
						/>
						<Route
							path="/loggedhome"
							render={() => <LoggedInHomepage isLogin={isLogin} logOut={this.logOut} />}
						/>
						<Route path="/login" render={() => <Login handleIsLoginChange={this.handleIsLoginChange} />} />
						<Route exact path="/signup" render={() => <Signup isLogin={isLogin} />} />
						<Route exact path="/mypage" render={() => <Mypage isLogin={isLogin} logOut={this.logOut} />} />
						<Route exact path="/notloggedin" render={() => <NotLoggedIn isLogin={isLogin} />} />
						<Route exact path="/todopage" render={() => <Todopage logOut={this.logOut} />} />
						{/* {!isLogin ? <Redirect from="*" to="/login" /> : <Redirect from="*" to="/" />} */}
					</Switch>
				</Router>
			</>
		);
	}
}
export default App;
