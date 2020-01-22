import React from "react";
import { withRouter, Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./signup.css";

axios.defaults.withCredentials = true;

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: ""
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }
  handleInputValue = key => e => {
    this.setState({ [key]: e.target.value });
  };
  render() {
    const { username, email, password } = this.state;
    return (
      <div>
        <div>
          <Link className="loginRedirectButton" to="/login">
            Login Page
          </Link>
        </div>
        <center>
          <h1>Sign Up</h1>
          <form
            onSubmit={e => {
              e.preventDefault();
              axios
                .post("http://localhost:4000/user/signup", {
                  username: username,
                  email: email,
                  password: password
                })
                .then(res => {
                  this.props.history.push("/login");
                })
                .catch(err => console.log(err));
            }}
          >
            <div>
              <input
                style={{
                  width: "400px",
                  height: "30px",
                  margin: "5px",
                  borderRadius: "5px"
                }}
                type="username"
                placeholder="사용자 아이디를 입력 해주세요"
                onChange={this.handleInputValue("username")}
              ></input>
            </div>
            <div>
              <input
                style={{
                  width: "400px",
                  height: "30px",
                  margin: "5px",
                  borderRadius: "5px"
                }}
                type="email"
                placeholder="이메일을 입력 해주세요"
                onChange={this.handleInputValue("email")}
              ></input>
            </div>
            <div>
              <input
                style={{
                  width: "400px",
                  height: "30px",
                  margin: "5px",
                  borderRadius: "5px"
                }}
                onChange={this.handleInputValue("password")}
                type="password"
                placeholder="비밀번호를 입력 해주세요"
              ></input>
            </div>
            <button
              style={{
                width: "200px",
                height: "30px",
                margin: "5px",
                borderRadius: "5px",
                backgroundColor: "skyblue"
              }}
              type="submit"
            >
              회원가입
            </button>
          </form>
        </center>
      </div>
    );
  }
}

export default withRouter(Signup);
z;
