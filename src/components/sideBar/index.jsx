/** @format */

import React from 'react';
import { Amd, Boxes } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
	const list = [
		{
			icon: <Boxes />,
			text: 'Dashboard',
      url:'/'
		},
		{
			icon: <Boxes />,
			text: 'Request Form',
      url:'/request-form'
		},
		{
			icon: <Boxes />,
			text: 'dashboard',
		},
		{
			icon: <Boxes />,
			text: 'dashboard',
		},
	];
const navigate=useNavigate()
	const ListItem = ({ icon, text,url }) => {
		console.log(icon, text, 'icon,text');
		return (
			<div onClick={()=>{navigate(url)}} className='hover:bg-blue-800 w-[100%] text-[1.2rem] p-5 text-white h-[2rem] items-center boder rounded flex cursor-pointer gap-3'>
				<div className='font-bold'>{icon}</div>
				<div className='font-bold '>{text}</div>
			</div>
		);
	};
	return (
		<div className='w-[100%] bg-blue-700 h-[100vh]'>
		<div className='p-10'>	<Amd className='w-[3rem] h-[3rem] text-white ' /></div>
			<div className='flex flex-col gap-2 p-3'>
				{list.map((item) => (
					<>
						<ListItem {...item} />
					</>
				))}
			</div>
		</div>
	);
}

export default Sidebar;
