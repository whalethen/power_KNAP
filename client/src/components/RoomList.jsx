import React from 'react';
import ReactDOM from 'react-dom';
import RoomListEntry from './RoomListEntry.jsx';

let RoomList = ({rooms}) => (
	<div>
		{rooms.map(room => 
			<RoomListEntry room={room} /> 
		)}
	</div>
)

export default RoomList = RoomList;