import React from 'react';
import './SelectedCalendarDataItem .css';
const SelectedCalendarDataItem = ({ data }) => {
	const { todoitem, status } = data;

	return (
		<div className="SelectedCalendarDataItem">
			<div className={status ? 'falseTodoItem' : 'trueTodoitem'}>{todoitem.slice(0, 7) + '..'}</div>
		</div>
	);
};

export default SelectedCalendarDataItem;
