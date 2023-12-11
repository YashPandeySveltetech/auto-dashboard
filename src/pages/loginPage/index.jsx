/** @format */

import React from 'react';
import { XLg } from 'react-bootstrap-icons';

function LoginPage() {
	return (
		<div className='bg-gradient-to-r from-cyan-300 to-purple-700 h-[100vh]  flex justify-center items-center w-[100%] '>
			<div className='bg-white flex relative justify-center gap-5 flex-col text-black  p-5 border rounded  w-[20rem]'>
        {/* <div className='w-4 absolute right-[1rem] font-bold top-[1rem] cursor-pointer'><XLg className='font-bold'/></div> */}
				<div className='text-2xl font-extrabold	text-center '>Login</div>
				<div className=' flex justify-center gap-5 flex-col'>
          <div>
					<label className='text-[.9rem] font-bold'>Username</label>{' '}
					<input className='border border-gray-300 w-full p-1 h-[2rem] rounded outline-2 outline-offset outline-blue-500' />
          </div>
				  <div>
					<label className='text-[.9rem] font-bold '>Password</label>{' '}
					<input className='border border-gray-300 w-full p-1 h-[2rem] rounded outline-2 outline-offset outline-blue-500' />
          <label className='text-[.9rem]  text-blue-400'>Forget Password?</label>{' '}
          </div>
				</div>
        <button className='text-white bg-gradient-to-r from-cyan-300 to-purple-700 h-[2rem]'>Login</button>
        <span className='text-[.8rem] text-center '>Not a member?<span className='text-blue-400 cursor-pointer'> Request for credential</span></span>{' '}

			</div>
		</div>
	);
}

export default LoginPage;
