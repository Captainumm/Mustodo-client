import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = key => e => {
    this.setState({
      [key]: e.target.value
    });
  };
  handleSubmit = e => {
    console.log("this.props is: ", this.props);
    e.preventDefault();
    const { email, password } = this.state;
    const { handleIsLoginChange } = this.props;
    // this.props.history.push("todopage");
    axios
      .post("http://localhost:4000/user/login", {
        email: email,
        password: password
      })
      .then(() => {
        handleIsLoginChange();
        this.props.history.push("/todopage");
        // return <Redirect to="/todopage" />;
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <>
        <h1>Sign In</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder={"이메일"}
            value={this.state.email}
            onChange={this.handleChange("email")}
          />
          <div>
            <input
              placeholder={"비밀번호"}
              value={this.state.password}
              onChange={this.handleChange("password")}
            />
          </div>
          <div>
            <Link to="/signup">아직 아이디가 없으신가요?</Link>
          </div>
          <button type="submit">로그인</button>
        </form>
      </>
    );
  }
}
export default withRouter(Login);
