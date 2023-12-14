
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
	loading: false
}

export const CommonSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state,{payload}) => {
      state.loading= payload
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { setLoading } = CommonSlice.actions

export default CommonSlice.reducer