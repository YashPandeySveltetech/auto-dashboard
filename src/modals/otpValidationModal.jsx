import React, { useEffect, useState } from "react";
import ModalWrapper from "../components/modalWrapper/ModalWrapper";
import { FORM_OTP_VERIFY, RESEND_FORM_OTP } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { ApiHandle } from "../utils/ApiHandle";
import Toaster from "../utils/toaster/Toaster";
import { commonCloseModal } from "../redux/reducers/modalsReducer";
import Input from "../components/input";

function OtpValidationModal() {
  const [otp, setOtp] = useState("");
  const { requestId,isFormVerified } = useSelector((state) => state?.modal);
  const dispatch = useDispatch();
  const [showResendButton, setShowResendButton] = useState(false);

  const [timeLeft, setTimeLeft] = useState(120); 

  useEffect(() => {
  
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    if(!isFormVerified){
        resendOtp()
       
    }

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setShowResendButton(true);
    }
  }, [timeLeft]);



  const verifyOtp = async () => {
    const res = await ApiHandle(
      FORM_OTP_VERIFY,
      { otp: otp, form_id: requestId },
      "POST"
    );
    if (res.statusCode === 201) {
      console.log(res, "otpvairifyed");
      dispatch(commonCloseModal());
      Toaster("success", "Otp verified Successfully!")
      return;
    }
  };

  const resendOtp= async () => {
    const res = await ApiHandle(
      RESEND_FORM_OTP,
      {  form_id: requestId },
      "POST"
    );
    if (res.statusCode === 201) {
        setTimeLeft(120);
        setShowResendButton(false);
      console.log(res, "otpvairifyed");
      Toaster("success", "Otp Sent Successfully")
      return;
    }

    
  };
 
  return (
    <ModalWrapper handleClick={verifyOtp} btnName={"Submit Otp"}>
      <div className="flex flex-col gap-5">
        <span className="text-xl text-white">Enter Your Otp</span>
        <Input
          onChange={(e) => setOtp(e?.target?.value)}
          
          type="text"
          name="otp"
          maxLength="6"
          inputMode="numeric"
        />



{timeLeft>0 ? (
    <p className="text-white">
      <span>Resend Otp after: {timeLeft} seconds</span>
    </p>
  ) : (showResendButton && <div>
    <button onClick={resendOtp} className="bg-blue-700 text-white hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-blue-800">
    Resend OTP
  </button>
  </div>
  )
}</div>
     
    </ModalWrapper>
  );
}

export default OtpValidationModal;
