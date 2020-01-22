import React from "react";
import axios from "axios";
import TodoTemplate from "./TodoTemplate";
import TodoInsert from "./TodoInsert";
import TodoList from "./TodoList";
import Calendar from "react-calendar";
import { Link, Redirect } from "react-router-dom";

axios.defaults.withCredentials = true;

class Todopage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      nextID: 0,
      isLogin: this.props.isLogin
    };
    this.plusTodo = this.plusTodo.bind(this);
    this.remove = this.remove.bind(this);
    this.onToggle = this.onToggle.bind(this);
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

  onToggle = async id => {
    const { todos } = this.state;
    //💌api 불러와서 토글상태 반대로 만들어주기;;;

    const {
      data: {
        data: { todoid, status }
      }
    } = await axios.post("http://localhost:4000/todo/info", {
      todoid: id
    });

    axios.post("http://localhost:4000/todo/status", {
      todoid: todoid,
      status: !status
    });
    // 😀
    const onToggleTodos = todos.map(todo =>
      todo.todoid === id ? { ...todo, status: !todo.status } : todo
    );
    this.setState({
      todos: onToggleTodos
    });
  };

  plusTodo = async inputTodo => {
    const { todos, nextID } = this.state;
    try {
      //
      //💌login 중인 userId가져오기
      const {
        data: { id }
      } = await axios.post("http://localhost:4000/user/getid");

      //💌todo 추가된 거 api로 보내userId 넣어서 보내주기
      await axios.post("http://localhost:4000/todo/add", {
        userid: id,
        todoid: nextID,
        todoitem: inputTodo,
        status: false
      });
      //😀this.state  관리 하는 부분
      const nextTodo = {
        userid: id,
        todoid: nextID,
        todoitem: inputTodo,
        status: false
      };

      this.setState({
        todos: todos.concat(nextTodo),
        nextID: nextID + 1
      });
    } catch (error) {
      console.log(error);
    }
  };
  remove = (...arr) => {
    //💌api에서 같은 아이디 찾아서 삭제해주기
    axios.post("http://localhost:4000/todo/delete", {
      todoid: arr[0][0],
      todoitem: arr[0][1]
    });

    //😀
    const { todos } = this.state;
    const filterArray = todos.filter(todo => todo.todoid !== arr[0][0]);

    this.setState({
      todos: filterArray
    });
  };

  componentDidMount() {
    //💌😀api에서 todoList요청 불러와서 this.state.Todos에 concat
    //[{},{},{}]

    const { todos } = this.state;
    axios
      .get("http://localhost:4000/user/todopage")
      .then(res => {
        this.setState({ todos: todos.concat(res.data) });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { todos } = this.state;
    let isLoggedIn = this.props.isLogin;
    if (isLoggedIn === true) {
      return (
        <>
          <div style={{ padding: "10px", float: "right" }} className="body">
            <Link
              className="loginRedirectButton"
              onClick={this.props.logOut}
              to="/"
            >
              Log Out
            </Link>
          </div>
          <div style={{ padding: "10px", float: "right" }} className="body">
            <Link className="loginRedirectButton" to="/mypage">
              My Page
            </Link>
          </div>
          <div style={{ padding: "10px", float: "right" }} className="body">
            <Link className="loginRedirectButton" to="/loggedhome">
              Home Page
            </Link>
          </div>
          <Calendar onChange={this.onChange} value={this.state.date} />
          <TodoTemplate>
            <TodoInsert plusTodo={this.plusTodo} />
            <TodoList
              todos={todos}
              remove={this.remove}
              onToggle={this.onToggle}
            />
          </TodoTemplate>
        </>
      );
    } else {
      return <Redirect to="/notloggedin" />;
    }
  }
}

export default Todopage;
