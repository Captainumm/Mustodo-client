import React from 'react';
import { MdCheckBoxOutlineBlank, MdCheckBox, MdDeleteForever } from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({ todo, remove, onToggle }) => {
	const { todoid, todoitem, status } = todo;
	return (
		<div className="TodoListItem">
			<div className={cn('checkbox', { status })} onClick={() => onToggle(todoid)}>
				{status ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
				<div className="text">{todoitem}</div>
			</div>
			<div className="remove" onClick={() => remove([todoid, todoitem])}>
				<MdDeleteForever />
			</div>
		</div>
	);
};

export default TodoListItem;
