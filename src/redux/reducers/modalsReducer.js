
// // import { MULTIPLY_FIVE } from './FiveType';

// const initialState = {
// 	loginData: []
// }

// const LoginReducer = (state = initialState, action) => {
// 	switch(action.type){
// 		case "LOGIN": return {
// 			...state,
// 			loginData: action.payload
// 		}
		
// 		default: return state
// 	}
// }

// export default LoginReducer;

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	rejectModal: false,
    viewLogModal:false,
    updateReqList:false,
    requestId:NaN,
    otpValidationModal:false,
    isFormVerified:false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    openRejectModal: (state,{payload}) => {
 
      state.rejectModal= true
      state.requestId=payload
    },
    openViewLogModal: (state,{payload}) => {
 
        state.viewLogModal= true
        state.requestId=payload
      },
      updateRequestList: (state,{payload}) => {
        state.updateReqList= payload
    
      },
      otpValidationModal: (state,{payload}) => {
        state.otpValidationModal= true
        state.requestId=payload?.id
        state.isFormVerified=payload?.form_verified
    
      },
    commonCloseModal: (state) => {
	   	state.rejectModal= false
        state.viewLogModal= false
        state.requestId=NaN
        state.otpValidationModal=false
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { commonCloseModal, openRejectModal,openViewLogModal,updateRequestList ,otpValidationModal} = userSlice.actions

export default userSlice.reducer