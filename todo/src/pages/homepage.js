import React from "react";
// import CartIcon from "./images/CartIcon.png";
//엄준식
class Homepage extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <a href="/login">login</a>
          </li>
          <li>
            <a href="/mypage">mypage</a>
          </li>
          <li>
            <a href="/todopage">todopage</a>
          </li>
          <li>
            <a href="/signup">signup</a>
          </li>
        </ul>
        <center>정민님 화해 축하합니다~~~~~</center>
      </div>
    );
  }
}
export default Homepage;
