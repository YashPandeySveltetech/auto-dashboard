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

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rejectModal: false,
  viewLogModal: false,
  updateReqList: false,
  requestId: NaN,
  otpValidationModal: false,
  passwordChangeModal: false,
  emailPasswordChangeModal: false,
  isFormVerified: false,
  dcpPasswordVerify: false,
  isACP: false,
  sendersEmail: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    openRejectModal: (state, { payload }) => {
      state.rejectModal = true;
      state.requestId = payload;
    },
    openViewLogModal: (state, { payload }) => {
      state.viewLogModal = true;
      state.requestId = payload;
    },
    openDcpPasswordVerifyModal: (state, { payload }) => {
      state.dcpPasswordVerify = true;
      state.requestId = payload.id;
      state.dcpStatus = payload;
    },

    updateRequestList: (state, { payload }) => {
      state.updateReqList = payload;
    },
    DcpPassowrdConfirm: (state, { payload }) => {
      state.isDcpPassword = payload;
    },
    resendModalApiCall: (state, { payload }) => {
      state.approveStatus = payload;
    },
    PasswordChangeModal: (state, { payload }) => {
      state.passwordChangeModal = payload;
    },
    EmailPasswordChangeModal: (state, { payload }) => {
      state.emailPasswordChangeModal = true;
      state.requestId = payload?.userID;
      state.sendersEmail = payload?.sendersEmail;
    },
    otpValidationModal: (state, { payload }) => {
      state.otpValidationModal = true;
      state.requestId = payload?.id;
      state.isFormVerified = payload?.form_verified;
    },
    commonCloseModal: (state) => {
      state.rejectModal = false;
      state.viewLogModal = false;
      state.requestId = NaN;
      state.otpValidationModal = false;
      state.dcpPasswordVerify = false;
      state.approveStatus = false;
      state.passwordChangeModal = false;
      state.sendersEmail = false;
      state.emailPasswordChangeModal = false;
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
    setRank: (state, action) => {
      state.isACP = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  commonCloseModal,
  openRejectModal,
  openViewLogModal,
  updateRequestList,
  otpValidationModal,
  openDcpPasswordVerifyModal,
  DcpPassowrdConfirm,
  PasswordChangeModal,
  setRank,
  resendModalApiCall,
  EmailPasswordChangeModal,
} = userSlice.actions;

export default userSlice.reducer;
