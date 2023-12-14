import React, { useEffect, useState } from 'react'
import ModalWrapper from '../components/modalWrapper/ModalWrapper'
import { REJECT_REQUEST } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { ApiHandle } from '../utils/ApiHandle';
import Toaster from '../utils/toaster/Toaster';
import { commonCloseModal } from '../redux/reducers/modalsReducer';

function ViewLogsModal() {
    const [logs,setLogs]=useState([])
    const {requestId}=useSelector((state)=>state?.modal)
const dispatch=useDispatch()
    const rejectRequest = async () => {
		const res = await ApiHandle(
			REJECT_REQUEST,
			{request_form:requestId},
			'GET'
		);
		if (res.statusCode === 200) {
            setLogs(res?.responsePayload?.results)
            // console.log(res?.responsePayload?.results);
			Toaster('success', 'Get Logs Successfully!');

			return;
		}
	};
    useEffect(()=>{
        rejectRequest()
    },[])


  return (
    <ModalWrapper handleClick={()=>dispatch(commonCloseModal())} btnName={"close"}>
        <div> 
        <table class='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
						<thead class='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
							<tr>
							
							
								<th
									scope='col'
									class='px-6 py-3'
								>
									REJECTION TIME
								</th>
                                <th
									scope='col'
									class='px-6 py-3'
								>
									 REASON FOR REJECTION
								</th>
                                <th
									scope='col'
									class='px-6 py-3'
								>
									REJECTED BY
								</th>
								
							</tr>
						</thead>
						<tbody>
							{logs?.map((item) => (
								<tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
									<th
										scope='row'
										class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
									>
										{item?.rejection_time?.split('T')[0]}
									</th>
									<td class='px-6 py-4'>{item?.rejection_reason}</td>
									<td class='px-6 py-4'>{item?.rejected_by}</td>
								
								
								</tr>
							))}
						</tbody>
					</table>
        </div>
    </ModalWrapper >
  )
}

export default ViewLogsModal