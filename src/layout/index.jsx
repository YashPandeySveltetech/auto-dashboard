/** @format */

import React from 'react';
import Sidebar from '../components/sideBar';
import Header from '../components/header';

function Layout({ children }) {
	return (
		<div className='flex w-[100%]'>
			<div className='w-[16%]'>
				<Sidebar />
			</div>
			<div className='w-[84%]'>
				<div>
					<Header />
				</div>
				<div className='p-10 rounded'>
					{' '}
					{children}
				</div>
			</div>
		</div>
	);
}

export default Layout;
