import React from 'react';
import { withRouter, Link, useHistory, Redirect } from 'react-router-dom';
import axios from 'axios';
import './mypage.css';
import DonutChart from 'react-donut-chart';

axios.defaults.withCredentials = true;

class Mypage extends React.Component {
	//dont forget to rupdate states with props!
	constructor(props) {
		super(props);
		this.state = {
			tempInput: '',
			userinfo: {},
			todoCount: 100,
			completeCount: 100,
			username: 'username',
			email: 'email',
			password: 'password',
			date: new Date(),
			isLogin: this.props.isLogin
		};
		this.handleInputValue = this.handleInputValue.bind(this);
		this.setUserInfo = this.setUserInfo.bind(this);
		this.userRef = React.createRef();
		this.emailRef = React.createRef();
		this.passwordRef = React.createRef();
		this.userEditButtonRef = React.createRef();
		this.emailEditButtonRef = React.createRef();
		this.passwordEditButtonRef = React.createRef();
	}
	componentDidMount() {
		axios.get('http://localhost:4000/user/mypage').then(res => {
			console.log('res is: ', res);
			this.setState({
				// userinfo: res.userinfo,
				todoCount: res.data.todoCount,
				completeCount: res.data.completeCount,
				username: res.data.userinfo.username,
				email: res.data.userinfo.email,
				password: res.data.userinfo.password
			});
		});
	}
	//유저정보 수정후 엔터를 치면 자동으로 저장된다.
	handleInputValue = key => e => {
		// this.setState({ [key]: e.target.value });
		this.setState({ [key]: e.target.value });
	};
	//edit 버튼을 클릭하고 유저정보를 수정한 후 save 버튼을 누르면 자동저장된다.
	handleUserEditValue = key => e => {
		e.preventDefault();
		// console.log("this.userRef is: ", this.userRef);
		console.log('this.userRef.current.style is: ', this.userRef.current.style);
		if (e.target.innerHTML === 'Edit') {
			e.target.innerHTML = 'Save';
			this.userRef.current.disabled = false;
			this.userRef.current.style.backgroundColor = 'white';
			this.userRef.current.focus();
		} else if (e.target.innerHTML === 'Save') {
			e.target.innerHTML = 'Edit';
			this.userRef.current.disabled = true;
			this.userRef.current.style.backgroundColor = '#ECF0F1';
			let data = { username: this.state.username };
			console.log('sending axios.put request with data: ', data);
			axios
				.put('http://localhost:4000/user/edit', data)
				.then(() => {
					console.log('username changed');
				})
				.catch(err => {
					console.log(err);
				});
		}
	};
	//email 정보 수정
	handleEmailEditValue = key => e => {
		console.log('this.emailRef is: ', this.emailRef);
		if (e.target.innerHTML === 'Edit') {
			//button text 바꾸기
			e.target.innerHTML = 'Save';
			//email input 태그 다루기
			this.emailRef.current.disabled = false;
			this.emailRef.current.style.backgroundColor = 'white';
			this.emailRef.current.focus();
		} else if (e.target.innerHTML === 'Save') {
			e.target.innerHTML = 'Edit';
			this.emailRef.current.disabled = true;
			this.emailRef.current.style.backgroundColor = '#ECF0F1';
			let data = { email: this.state.email };
			try {
				axios.put('http://localhost:4000/user/edit', data);
				console.log('after editing email, new this.state.email is: ', this.state.email);
			} catch (error) {
				console.log(error);
			}
		}
	};
	//비밀번호 정보 수정
	handlePasswordEditValue = key => e => {
		console.log('this.passwordRef is: ', this.passwordRef);
		if (e.target.innerHTML === 'Edit') {
			e.target.innerHTML = 'Save';
			this.passwordRef.current.disabled = false;
			this.passwordRef.current.style.backgroundColor = 'white';
			this.passwordRef.current.focus();
		} else if (e.target.innerHTML === 'Save') {
			e.target.innerHTML = 'Edit';
			this.passwordRef.current.disabled = true;
			this.passwordRef.current.style.backgroundColor = '#ECF0F1';
			let data = { password: this.state.password };
			try {
				axios.put('http://localhost:4000/user/edit', data);
			} catch (error) {
				console.log(error);
			}
		}
	};
	clearUsernameFocus = key => e => {
		this.userRef.current.placeholder = '';
	};
	clearEmailFocus = key => e => {
		this.emailRef.current.placeholder = '';
	};
	clearPasswordFocus = key => e => {
		this.passwordRef.current.placeholder = '';
	};
	onUsernameBlur = key => e => {
		// console.log("username onBlur this.state[key]: ", this.state[key]);
		this.userRef.current.placeholder = this.state.username;
	};
	onEmailBlur = key => e => {
		// console.log("username onBlur this.state[key]: ", this.state[key]);
		this.emailRef.current.placeholder = this.state.email;
	};
	onPasswordBlur = key => e => {
		// console.log("username onBlur this.state[key]: ", this.state[key]);
		this.passwordRef.current.placeholder = this.state.password;
	};
	setUserInfo = key => e => {
		e.preventDefault();
		if (e.key === 'Enter') {
			let changeData = {
				[key]: e.target.value
			};

			try {
				axios.put('http://localhost:4000/user/edit', changeData);
			} catch (error) {
				console.log(error);
			}
			this.setState({ [key]: this.state.tempInput });
			if (key === 'username') {
				this.userRef.current.blur();
				this.userRef.current.disabled = true;
				this.userRef.current.style.backgroundColor = '#ECF0F1';
				this.userEditButtonRef.current.innerHTML = 'Edit';
			} else if (key === 'email') {
				this.emailRef.current.blur();
				this.emailRef.current.disabled = true;
				this.emailRef.current.style.backgroundColor = '#ECF0F1';
				this.emailEditButtonRef.current.innerHTML = 'Edit';
			} else if (key === 'password') {
				this.passwordRef.current.blur();
				this.passwordRef.current.disabled = true;
				this.passwordRef.current.style.backgroundColor = '#ECF0F1';
				this.passwordEditButtonRef.current.innerHTML = 'Edit';
			}
		}
	};
	render() {
		return (
			<>
				<div className="myPageLinkBox">
					<div className="myPageHomePage">
						<Link style={{ color: 'white' }} onClick={this.props.logOut} to="/">
							HomePage
						</Link>
					</div>

					<div className="myPageTodoPage">
						<Link style={{ color: 'white' }} to="/todopage">
							Todo Page
						</Link>
					</div>
				</div>

				<div className="fatherBox">
					<div className="myPageTitle">My Page</div>

					<div className="userInfoTitle">User Info</div>
					{/* ㅁ */}
					<div className="editInputButtonFatherBox">
						<input
							type="text"
							placeholder={this.state.username}
							id="usernameBox"
							onChange={this.handleInputValue('username')}
							ref={this.userRef}
							disabled
							onFocus={this.clearUsernameFocus()}
							onBlur={this.onUsernameBlur()}
							onKeyUp={this.setUserInfo('username')}
							className="userEditInput"
						></input>
						<button
							type="button"
							className="hoverButton userEditButton"
							ref={this.userEditButtonRef}
							onClick={this.handleUserEditValue()}
						>
							Edit
						</button>
					</div>
					<div className="editInputButtonFatherBox">
						<input
							type="text"
							placeholder={this.state.email}
							id="emailBox"
							onChange={this.handleInputValue('email')}
							ref={this.emailRef}
							disabled
							onFocus={this.clearEmailFocus()}
							onBlur={this.onEmailBlur()}
							onKeyUp={this.setUserInfo('email')}
							className="emailEditInput"
						></input>
						<button
							type="button"
							className="hoverButton emailEditButton"
							ref={this.emailEditButtonRef}
							onClick={this.handleEmailEditValue()}
						>
							Edit
						</button>
					</div>
					<div className="editInputButtonFatherBox">
						<input
							type="text"
							placeholder={this.state.password}
							id="passwordBox"
							onChange={this.handleInputValue('password')}
							ref={this.passwordRef}
							disabled
							onFocus={this.clearPasswordFocus()}
							onBlur={this.onPasswordBlur()}
							onKeyUp={this.setUserInfo('password')}
							className="passwordEditInput"
						></input>
						<button
							type="button"
							className="hoverButton passwordEditButton"
							ref={this.passwordEditButtonRef}
							onClick={this.handlePasswordEditValue()}
						>
							Edit
						</button>
					</div>
					{/* ㅁ */}
					<div className="userStatisticsTitle">Statistics</div>
					{/* 아래는 그래프 부분입니다. 참고하세요 */}

					<div align="center" className="statisticsBox">
						<DonutChart
							width={400}
							height={260}
							className="donut"
							data={[
								{
									label: '완료',
									value: this.state.completeCount
								},
								{
									label: '미완료',
									value: this.state.todoCount - this.state.completeCount,
									isEmpty: true
								}
							]}
						/>
						<h4 align="center">작성한 Mustodo 수: {this.state.todoCount}</h4>
					</div>

					{/* 그래프 끝 */}
					{/* <Calendar onChange={this.onChange} value={this.state.date} /> */}
				</div>
			</>
		);
	}
}
export default Mypage;
