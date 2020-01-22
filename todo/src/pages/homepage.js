import React from 'react';
import { Link } from 'react-router-dom';
import './homepage.css';
class Homepage extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { isLogin } = this.props;
		console.log('HomeIsLogoin', isLogin);
		return (
			<>
				<div className="homaPageLinkBox">
					<div className="LinkCss">
						<Link style={{ color: 'white' }} to="/login">
							Login Page
						</Link>
					</div>
					<div className="LinkCss">
						<Link style={{ color: 'white' }} to="/signup">
							Sign Up
						</Link>
					</div>

					<div className="LinkCss">
						<Link style={{ color: 'white' }} to="/todopage">
							TodoPage
						</Link>
					</div>
					<div className="LinkCss">
						<Link style={{ color: 'white' }} to="/mypage">
							MyPage
						</Link>
					</div>
				</div>
				)
				<div className="homaPageheader" />
				<div className="helloWorld">어서오세요 여러분 후룰롤루ㅜ라라라라</div>
			</>
		);
	}
}
export default Homepage;
