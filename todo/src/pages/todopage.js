import React from "react";
import axios from "axios";
import TodoTemplate from "./TodoTemplate";
import TodoInsert from "./TodoInsert";
import TodoList from "./TodoList";
import Calendar from "react-calendar";
import SelectedCalendarData from "./selectedCalendarData";
import "./todopage.css";
import { Link, Redirect } from "react-router-dom";
import CountTimer from "./countTimer";
import Weather from "./Weather";

axios.defaults.withCredentials = true;

class Todopage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      nextID: 0,
      date: new Date(),
      CalendarData: [],
      isLogin: this.props.isLogin
    };
    this.plusTodo = this.plusTodo.bind(this);
    this.remove = this.remove.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onToggle = async id => {
    const { todos } = this.state;
    //💌api 불러와서 토글상태 반대로 만들어주기;;;

    const {
      data: {
        data: { todoid, status }
      }
    } = await axios.post("http://18.191.193.104:4000/todo/info", {
      todoid: id
    });

    axios.post("http://18.191.193.104:4000/todo/status", {
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
      //시간 가져오기
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getUTCDate() + 1;
      day === 32 ? (day = 1) : (day = day);
      month === 13 ? (month = 1) : (month = month);

      let time = `${year}-${month < 10 ? `0${month}` : month}-${
        day < 10 ? `0${day}` : day
      }`;

      console.log(time); //2020-01-23 04:22:56

      //💌login 중인 userId가져오기
      const {
        data: { id }
      } = await axios.post("http://18.191.193.104:4000/user/getid");

      //💌todo 추가된 거 api로 보내userId 넣어서 보내주기
      await axios.post("http://18.191.193.104:4000/todo/add", {
        userid: id,
        todoid: nextID + inputTodo,
        todoitem: inputTodo,
        status: false,
        time: time
      });
      //😀this.state  관리 하는 부분
      const nextTodo = {
        userid: id,
        todoid: nextID + inputTodo,
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
    axios.post("http://18.191.193.104:4000/todo/delete", {
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
      .get("http://18.191.193.104:4000/user/todopage")
      .then(res => {
        this.setState({ todos: todos.concat(res.data) });
      })
      .catch(err => console.log(err));
  }
  // 달력  OnChange//
  onChange = async date => {
    const selectedCalendarData = [];
    this.setState({ date });

    let getDate =
      date.getDate() === 1
        ? "01"
        : date.getDate() < 9
        ? "0" + date.getDate() + ""
        : date.getDate() + "";
    console.log(getDate);
    let getYear = date.getFullYear() + "";
    let getMonth =
      date.getMonth() === 0
        ? "01"
        : date.getMonth() < 10
        ? "0" + (date.getMonth() + 1) + ""
        : date.getMonth() + 1 + "";

    let chosenDate = getYear + "-" + getMonth + "-" + getDate;

    let data = { time: chosenDate };
    console.log(data);
    axios.post("http://18.191.193.104:4000/calendar", data).then(res => {
      if (res.data.length > 0) {
        this.setState({
          CalendarData: res.data
        });
      } else {
        alert("Nothing created on this date.");
      }
    });
  };
  render() {
    const { todos, CalendarData } = this.state;

    return (
      <>
        <div className="linkBox">
          <div className="linkLogout">
            <Link style={{ color: "white" }} onClick={this.props.logOut} to="/">
              Log Out
            </Link>
          </div>
          <div className="linkMypage">
            <Link style={{ color: "white" }} to="/mypage">
              My Page
            </Link>
          </div>
        </div>

        <div className="header" />
        <div className="middle">
          <Calendar
            className="calendar"
            onChange={this.onChange}
            value={this.state.date}
          />
          <SelectedCalendarData selectedCalendarData={CalendarData} />
        </div>
        <CountTimer />
        <Weather />
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
  }
}

export default Todopage;
