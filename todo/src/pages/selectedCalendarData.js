import React from 'react';
import './selectedCalendarData.css';
import SelectedCalendarDataItem from './SelectedCalendarDataItem ';

const SelectedCalendarData = ({ selectedCalendarData }) => {
	if (!selectedCalendarData.length) return null;

	return (
		<div className="fatherCalendarListBox">
			{selectedCalendarData.map((data, i) => (
				<SelectedCalendarDataItem data={data} key={i} />
			))}
		</div>
	);
};

export default SelectedCalendarData;
