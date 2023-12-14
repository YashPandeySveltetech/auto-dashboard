/** @format */

import React, { useEffect, useState } from 'react';
import { ApiHandle } from '../../utils/ApiHandle';
import { FORM_REQUEST, APPROVE_REQUEST } from '../../utils/constants';
import Toaster from '../../utils/toaster/Toaster';
import { useNavigate } from 'react-router';
import FilterSection from './filterSection';
import { useDispatch } from 'react-redux';
import { openRejectModal } from '../../redux/reducers/modalsReducer';

function RequestList() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		getAllRequest();
	}, []);
	const [requestList, setRequestList] = useState([]);

	const getAllRequest = async () => {
		const res = await ApiHandle(
			FORM_REQUEST +
				`?case_type=${filter?.case_type}&request_to_provide=${filter?.req_to_provider}&fir_no=${filter?.case_ref}&form_status=${filter.form_status}`,
			{},
			'GET'
		);
		if (res.statusCode === 200) {
			console.log(res?.responsePayload, 'res');
			setRequestList(res?.responsePayload);
			// setIsOtp(true);
			// Toaster('success', 'OTP SENT Successfully!');

			return;
		}
	};
	const [filter, setFilter] = useState({
		req_to_provider: '',
		form_status: '',
		case_ref: '',
		case_type: '',
	});
	const approveRequest = async ({ requestId,approved_desion_id }) => {
		const res = await ApiHandle(
			APPROVE_REQUEST+`${approved_desion_id}/`,
			{request_form: requestId },
			'PATCH'
		);
		if (res.statusCode === 200) {
			// console.log(res?.responsePayload, 'res');
			// setRequestList(res?.responsePayload);
			// setIsOtp(true);
            getAllRequest()
			Toaster('success', 'Request Approved Successfully!');

			return;
		}
	};
	return (
		<>
			<FilterSection
				filter={filter}
				getAllRequest={getAllRequest}
				setFilter={setFilter}
			/>
			<div>
				<div class='relative overflow-x-auto'>
					<table class='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
						<thead class='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
							<tr>
								<th
									scope='col'
									class='px-6 py-3'
								>
									DATE OF REQUEST
								</th>
								<th
									scope='col'
									class='px-6 py-3'
								>
									NAME OF DIST/ORGN.
								</th>
								<th
									scope='col'
									class='px-6 py-3'
								>
									REQUESTED TYPE(CDR, IMEI,TDR,IPDR,CAF)
								</th>
								<th
									scope='col'
									class='px-6 py-3'
								>
									TARGET TYPE(MOBILE NO./IP ADDRESS/IMEI/CELL ID)
								</th>
								<th
									scope='col'
									class='px-6 py-3'
								>
									DURATION (DATE & TIME)
								</th>
								<th
									scope='col'
									class='px-6 py-3'
								>
									ACTION{' '}
								</th>
								<th
									scope='col'
									class='px-6 py-3'
								>
									REMARKS(REASON FOR REJECTION){' '}
								</th>
							</tr>
						</thead>
						<tbody>
							{requestList?.results?.map((item) => (
								<tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
									<th
										scope='row'
										class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
									>
										{item?.created_on?.split('T')[0]}
									</th>
									<td class='px-6 py-4'>{item?.district}</td>
									<td class='px-6 py-4'>{item?.request_to_provide}</td>
									<td class='px-6 py-4'>{item?.target_type}</td>
									<td class='px-6 py-4'>
										{/* <button className='bg-green-300'>Approve</button> */}
										<button className='bg-blue-300'>Click</button>
										{/* <button className='bg-red-900'>Reject</button> */}
									</td>
									<td class='px-6 py-4'>
										<button
											onClick={() => {
												approveRequest({requestId:item?.id,approved_desion_id:item?.approve_decision_id});
											}}
											className='bg-green-300'
										>
											Approve
										</button>
										<button
											onClick={() => {
												navigate(
													`/request/view/${item?.request_to_provide}/${item?.id}`
												);
											}}
											className='bg-blue-300'
										>
											View
										</button>
										<button
											onClick={() => dispatch(openRejectModal(item?.id))}
											className='bg-red-900'
										>
											Reject
										</button>
									</td>
									<td class='px-6 py-4'>
										{item?.decision}
										{item?.decision == 'REJECT' && (
											<button className='bg-red-900 mx-4 p-2'>View Log</button>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default RequestList;
