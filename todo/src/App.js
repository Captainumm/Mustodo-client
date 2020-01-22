import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import axios from "axios";
import Homepage from "../src/pages/homepage";
import Login from "../src/pages/login";
import Mypage from "../src/pages/mypage";
import Signup from "../src/pages/signup";
import Todopage from "../src/pages/todopage";

axios.defaults.withCredentials = true;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      userinfo: {},
      DBtodos: ""
    };
    this.handleIsLoginChange = this.handleIsLoginChange.bind(this);
  }
  handleIsLoginChange = () => {
    // this.setState({ isLogin: true });
    const savedTodoData = axios.get("http://localhost:4000/user/todopage");
    this.setState({
      isLogin: true,
      DBtodos: savedTodoData
    });
  };
  render() {
    const { isLogin, userinfo, DBtodos } = this.state;
    return (
      <>
        <h1>MusToDo</h1>
        <Router>
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route
              path="/login"
              render={() => (
                <Login handleIsLoginChange={this.handleIsLoginChange} />
              )}
            />
            <Route
              path="/mypage"
              exact
              component={Mypage}
              userInfo={userinfo}
            />
            <Route path="/signup" exact component={Signup} />
            <Route path="/todopage" exact component={Todopage} />
            <Redirect from="*" to="/"></Redirect>
          </Switch>
        </Router>
      </>
    );
  }
}
export default App;
