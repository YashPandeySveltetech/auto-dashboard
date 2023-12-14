
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
    requestId:NaN
}

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    openRejectModal: (state,{payload}) => {
 
      state.rejectModal= true
      state.requestId=payload
    },
    commonCloseModal: (state) => {
		state.rejectModal= false
        state.requestId=NaN
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { commonCloseModal, openRejectModal } = userSlice.actions

export default userSlice.reducer