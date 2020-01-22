import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import './login.css';
axios.defaults.withCredentials = true;

class Login extends React.Component {
	state = {
		email: '',
		password: ''
	};
	handleChange = key => e => {
		this.setState({
			[key]: e.target.value
		});
	};
	handleSubmit = e => {
		e.preventDefault();
		const { email, password } = this.state;
		const { handleIsLoginChange } = this.props;

		return axios
			.post('http://localhost:4000/user/login', {
				email: email,
				password: password
			})
			.then(res => {
				if (res.status === 200) {
					handleIsLoginChange();
					this.props.history.push('/todopage');
				}
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<>
				<div className="LoginLinkBox">
					<div className="signUp">
						<Link style={{ color: 'white' }} to="/signup">
							Sign up
						</Link>
					</div>
					<div className="HomePage">
						<Link style={{ color: 'white' }} to="/">
							Home Page
						</Link>
					</div>
				</div>
				<div className="loginheader" />

				<div className="loginTemplate">
					<h1>Sign In</h1>
					<form onSubmit={this.handleSubmit}>
						<input
							type="email"
							style={{ width: '400px', height: '30px', margin: '5px', borderRadius: '5px' }}
							placeholder={'이메일'}
							value={this.state.email}
							onChange={this.handleChange('email')}
						/>
						<div>
							<input
								type="password"
								style={{ width: '400px', height: '30px', margin: '5px', borderRadius: '5px' }}
								placeholder={'비밀번호'}
								value={this.state.password}
								onChange={this.handleChange('password')}
							/>
						</div>
						<div>
							<Link style={{ color: ' #eb4d4b' }} className="signUpButton" to="/signup">
								아직 아이디가 없으신가요?
							</Link>
						</div>
						<button
							style={{
								width: '200px',
								height: '30px',
								margin: '5px',
								borderRadius: '5px',
								backgroundColor: ' #eb4d4b'
							}}
							type="submit"
						>
							로그인
						</button>
					</form>
				</div>
			</>
		);
	}
}

export default withRouter(Login);
