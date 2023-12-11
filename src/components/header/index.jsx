/** @format */

import React from 'react';
import { Search, XLg } from 'react-bootstrap-icons';

function Header() {
	return (
		<div className=' p-6 border text-gray-300 flex w-full items-center 	'>
			<div>
				<Search />
			</div>
			<div className='w-full'>
				<input className='w-full outline-none	border-none' />
			</div>
			<div>
				<XLg />
			</div>
		</div>
	);
}

export default Header;
