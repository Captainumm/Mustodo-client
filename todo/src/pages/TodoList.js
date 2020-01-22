import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';
const TodoList = ({ todos, remove, onToggle }) => {
	return (
		<div className="TodoList">
			{todos.map((todo, i) => (
				<TodoListItem todo={todo} key={i} remove={remove} onToggle={onToggle} />
			))}
		</div>
	);
};

export default TodoList;
