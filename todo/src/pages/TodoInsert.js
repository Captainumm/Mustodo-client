import React from "react";
import { MdAdd } from "react-icons/md";
import "./TodoInsert.scss";
class TodoInsert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };
  handleSubmit = e => {
    if (this.state.value !== "") {
      e.preventDefault();
      const { value } = this.state;
      const { plusTodo } = this.props;
      plusTodo(value);
      this.setState({
        value: ""
      });
    }
    e.preventDefault();
  };

  render() {
    return (
      <form className="TodoInsert" onSubmit={this.handleSubmit}>
        <input
          placeholder="할 일을 입력하세요"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button type="submit">
          <MdAdd /> {/* 버튼아이콘  */}
        </button>
      </form>
    );
  }
}

export default TodoInsert;
