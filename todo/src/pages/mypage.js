import React from "react";
import { withRouter, Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./mypage.css";
import DonutChart from "react-donut-chart";
import Calendar from "react-calendar";

axios.defaults.withCredentials = true;

//data =
// {
//   userinfo:{},
//   todoCount: int,
//   completeCount: int
// }
class Mypage extends React.Component {
  //dont forget to rupdate states with props!
  constructor(props) {
    super(props);
    this.state = {
      tempInput: "",
      userinfo: {},
      todoCount: 89,
      completeCount: 26,
      username: "placeholder username",
      email: "placeholder email",
      password: "placeholder password",
      date: new Date()
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
    axios.get("http://localhost:4000/user/mypage").then(res => {
      console.log("res is: ", res);
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
  onChange = async date => {
    this.setState({ date });
    // const stateDate = this.state.date;
    // const sliceDate = stateDate.slice(4, 15);
    // console.log("Full date: ", date);
    // console.log("getMonth: ", date.getMonth());
    let getDate =
      date.getDate() === 1
        ? "01"
        : date.getDate() < 9
        ? "0" + date.getDate() + ""
        : date.getDate() + "";
    let getYear = date.getFullYear() + "";
    let getMonth =
      date.getMonth() === 0
        ? "01"
        : date.getMonth() < 10
        ? "0" + (date.getMonth() + 1) + ""
        : date.getMonth() + 1 + "";

    let chosenDate = getYear + "-" + getMonth + "-" + getDate;
    // console.log("chosendate: ", chosenDate);
    let data = { createdAt: chosenDate };
    // ("2020-01-20");
    // console.log(data);
    axios.post("http://localhost:4000/calendar", data).then(res => {
      console.log("calendar res is: ", res);
      if (res.data.length > 0) {
        alert(
          "first todo: " +
            res.data[0].todoitem +
            ". second todo: " +
            res.data[1].todoitem +
            "."
        );
      } else {
        alert("Nothing created on this date.");
      }
    });

    // console.log("Year: ", getYear);
    // console.log("Date: ", getDate);
    // console.log("Month: ", getMonth);
    // console.log("typeof year: ", typeof getYear);
    // console.log("typeof month: ", typeof getMonth);
    // console.log("typeof date: ", typeof getDate);
    // console.log("typeof chosendate: ", typeof chosenDate);
  };
  handleInputValue = key => e => {
    // this.setState({ [key]: e.target.value });
    this.setState({ [key]: e.target.value });
  };
  handleUserEditValue = key => e => {
    e.preventDefault();
    // console.log("this.userRef is: ", this.userRef);
    console.log("this.userRef.current.style is: ", this.userRef.current.style);
    if (e.target.innerHTML === "Edit") {
      e.target.innerHTML = "Save";
      this.userRef.current.disabled = false;
      this.userRef.current.style.backgroundColor = "white";
      this.userRef.current.focus();
    } else if (e.target.innerHTML === "Save") {
      e.target.innerHTML = "Edit";
      this.userRef.current.disabled = true;
      this.userRef.current.style.backgroundColor = "#ECF0F1";
      let data = { username: this.state.username };
      console.log("sending axios.put request with data: ", data);
      axios
        .put("http://localhost:4000/user/edit", data)
        .then(() => {
          console.log("username changed");
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  handleEmailEditValue = key => e => {
    console.log("this.emailRef is: ", this.emailRef);
    if (e.target.innerHTML === "Edit") {
      //button text 바꾸기
      e.target.innerHTML = "Save";
      //email input 태그 다루기
      this.emailRef.current.disabled = false;
      this.emailRef.current.style.backgroundColor = "white";
      this.emailRef.current.focus();
    } else if (e.target.innerHTML === "Save") {
      e.target.innerHTML = "Edit";
      this.emailRef.current.disabled = true;
      this.emailRef.current.style.backgroundColor = "#ECF0F1";

      let data = { email: this.state.email };
      try {
        axios.put("http://localhost:4000/user/edit", data);
        console.log(
          "after editing email, new this.state.email is: ",
          this.state.email
        );
      } catch (error) {
        console.log(error);
      }
    }
  };
  handlePasswordEditValue = key => e => {
    console.log("this.passwordRef is: ", this.passwordRef);
    if (e.target.innerHTML === "Edit") {
      e.target.innerHTML = "Save";
      this.passwordRef.current.disabled = false;
      this.passwordRef.current.style.backgroundColor = "white";
      this.passwordRef.current.focus();
    } else if (e.target.innerHTML === "Save") {
      e.target.innerHTML = "Edit";
      this.passwordRef.current.disabled = true;
      this.passwordRef.current.style.backgroundColor = "#ECF0F1";
      let data = { password: this.state.password };
      try {
        axios.put("http://localhost:4000/user/edit", data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  clearUsernameFocus = key => e => {
    this.userRef.current.placeholder = "";
  };
  clearEmailFocus = key => e => {
    this.emailRef.current.placeholder = "";
  };
  clearPasswordFocus = key => e => {
    this.passwordRef.current.placeholder = "";
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
    if (e.key === "Enter") {
      let changeData = {
        [key]: e.target.value
      };

      // console.log("changeData is: ", changeData);
      // console.log("e is: ", e);
      // axios
      //   .put("http://localhost:4000/user/edit", changeData)
      //   .then(res => {
      //     this.setState({ [key]: e.target.value });
      //   })
      //   .catch(err => console.log(err));

      try {
        axios.put("http://localhost:4000/user/edit", changeData);
      } catch (error) {
        console.log(error);
      }
      this.setState({ [key]: this.state.tempInput });
      if (key === "username") {
        this.userRef.current.blur();
        this.userRef.current.disabled = true;
        this.userRef.current.style.backgroundColor = "#ECF0F1";
        this.userEditButtonRef.current.innerHTML = "Edit";
      } else if (key === "email") {
        this.emailRef.current.blur();
        this.emailRef.current.disabled = true;
        this.emailRef.current.style.backgroundColor = "#ECF0F1";
        this.emailEditButtonRef.current.innerHTML = "Edit";
      } else if (key === "password") {
        this.passwordRef.current.blur();
        this.passwordRef.current.disabled = true;
        this.passwordRef.current.style.backgroundColor = "#ECF0F1";
        this.passwordEditButtonRef.current.innerHTML = "Edit";
      }
    }
  };
  render() {
    let number = (
      (this.state.completeCount / this.state.todoCount) *
      100
    ).toString();
    return (
      <div className="body">
        <div className="body">
          <div className="body">
            <div style={{ padding: "10px", float: "right" }} className="body">
              <Link className="loginRedirectButton" to="/login">
                Log Out
              </Link>
            </div>
            <div style={{ padding: "10px", float: "right" }} className="body">
              <Link className="loginRedirectButton" to="/todopage">
                Todo Page
              </Link>
            </div>
          </div>
        </div>
        <div className="body">
          <center className="myPageTitle">My Page</center>
        </div>
        <div className="userInfoTitle">User Info</div>
        <div className="userStatisticsTitle">Statistics</div>

        <div className="body">
          <input
            type="text"
            placeholder={this.state.username}
            id="usernameBox"
            onChange={this.handleInputValue("username")}
            ref={this.userRef}
            disabled
            onFocus={this.clearUsernameFocus()}
            onBlur={this.onUsernameBlur()}
            onKeyUp={this.setUserInfo("username")}
          ></input>
          <button
            type="button"
            className="userEditButton"
            ref={this.userEditButtonRef}
            onClick={this.handleUserEditValue()}
          >
            Edit
          </button>

          <input
            type="text"
            placeholder={this.state.email}
            id="emailBox"
            onChange={this.handleInputValue("email")}
            ref={this.emailRef}
            disabled
            onFocus={this.clearEmailFocus()}
            onBlur={this.onEmailBlur()}
            onKeyUp={this.setUserInfo("email")}
          ></input>
          <button
            type="button"
            className="emailEditButton"
            ref={this.emailEditButtonRef}
            onClick={this.handleEmailEditValue()}
          >
            Edit
          </button>

          <input
            type="text"
            placeholder={this.state.password}
            id="passwordBox"
            onChange={this.handleInputValue("password")}
            ref={this.passwordRef}
            disabled
            onFocus={this.clearPasswordFocus()}
            onBlur={this.onPasswordBlur()}
            onKeyUp={this.setUserInfo("password")}
          ></input>
          <button
            type="button"
            className="passwordEditButton"
            ref={this.passwordEditButtonRef}
            onClick={this.handlePasswordEditValue()}
          >
            Edit
          </button>
        </div>
        <Calendar onChange={this.onChange} value={this.state.date} />
        <div className="statisticsBox">
          <DonutChart
            className="donut"
            data={[
              {
                label: "완료한 Mustodo 수",
                value: this.state.completeCount
              },
              {
                label: "미완료 Mustodo 수",
                value: this.state.todoCount - this.state.completeCount,
                isEmpty: true
              }
            ]}
          />

          <h2 align="center">작성한 Mustodo 수:</h2>
          <h2 align="center">{this.state.todoCount}</h2>
        </div>
      </div>
    );
  }
}

export default Mypage;
