import React, { useState } from 'react'
import ModalWrapper from '../components/modalWrapper/ModalWrapper'
import { REJECT_REQUEST } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { ApiHandle } from '../utils/ApiHandle';
import Toaster from '../utils/toaster/Toaster';
import { commonCloseModal } from '../redux/reducers/modalsReducer';

function RejectModal() {
    const [reson,setReson]=useState("")
    const {requestId}=useSelector((state)=>state?.modal)
const dispatch=useDispatch()
    const rejectRequest = async () => {
		const res = await ApiHandle(
			REJECT_REQUEST,
			{rejection_reason:reson,request_form:requestId},
			'POST'
		);
		if (res.statusCode === 201) {
			// console.log(res?.responsePayload, 'res');
			// setRequestList(res?.responsePayload);
			// setIsOtp(true);
            dispatch(commonCloseModal());
			Toaster('success', 'Request Reject Successfully!');

			return;
		}
	};
  return (
    <ModalWrapper handleClick={rejectRequest} btnName={"Reject"}>
        <div> 
            <span className='text-xl text-white'>Reson For Reject</span>
            <textarea onChange={(e)=>setReson(e.target.value)} value={reson} className='w-full' rows="4" type='text'/>
        </div>
    </ModalWrapper >
  )
}

export default RejectModal