import React, {useEffect, useState} from "react";
import ModalWrapper from "../components/modalWrapper/ModalWrapper";
import {FORM_OTP_VERIFY, RESEND_FORM_OTP} from "../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import {ApiHandle} from "../utils/ApiHandle";
import Toaster from "../utils/toaster/Toaster";
import {commonCloseModal} from "../redux/reducers/modalsReducer";
import Input from "../components/input";
import {useLocation, useNavigate} from "react-router-dom";

function OtpValidationModal() {
  const [otp, setOtp] = useState("");
  // const otp = "otp"
  const navigate = useNavigate();
  const {requestId, isFormVerified} = useSelector((state) => state?.modal);
  const dispatch = useDispatch();
  const {pathname} = useLocation();
  const [showResendButton, setShowResendButton] = useState(false);
  const isCreate = pathname.includes("request-form");
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
<<<<<<< HEAD
=======

>>>>>>> 733f0d7580621074a7357905edc6d3a78044f900
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!isFormVerified && !isCreate) {
      resendOtp();
    } else {
      setTimeLeft(120);
    }
  }, [isFormVerified, isCreate]);
<<<<<<< HEAD

=======
>>>>>>> 733f0d7580621074a7357905edc6d3a78044f900
  useEffect(() => {
    if (timeLeft <= 0) {
      setShowResendButton(true);
    }
  }, [timeLeft]);

  const verifyOtp = async () => {
    const res = await ApiHandle(
      FORM_OTP_VERIFY,
      {otp: otp, form_id: requestId},
      "POST"
    );
    if (res.statusCode === 201) {
      dispatch(commonCloseModal());
      Toaster("success", "Otp verified Successfully!");
      navigate("/");
      return;
    }
  };

  const resendOtp = async () => {
<<<<<<< HEAD
    const res = await ApiHandle(
      RESEND_FORM_OTP,
      { form_id: requestId },
      "POST"
    );
=======
    const res = await ApiHandle(RESEND_FORM_OTP, {form_id: requestId}, "POST");
>>>>>>> 733f0d7580621074a7357905edc6d3a78044f900
    if (res.statusCode === 201) {
      setTimeLeft(120);
      setShowResendButton(false);
      Toaster("success", "Otp Sent & Valid Till 5 Minutes");
      return;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      verifyOtp();
    }
  };

  const handleChange = (e) => {
<<<<<<< HEAD
      const Value = e.target.value.slice(0,6);
      setOtp(Value);
  };

=======
    const {value, name} = e.target;
    let Value = value.replace(/[^0-9]/g, "");
    e.target.value = Value;
    setOtp(Value);
  };
>>>>>>> 733f0d7580621074a7357905edc6d3a78044f900
  return (
    <ModalWrapper handleClick={verifyOtp} btnName={"Submit Otp"}>
      <div className="flex flex-col gap-5">
        <span className="text-xl text-white">Enter Your Otp</span>
        <Input
<<<<<<< HEAD
          onChange={(e)=>handleChange(e)}
          type="number"
=======
          onChange={(e) => handleChange(e)}
          type="text"
>>>>>>> 733f0d7580621074a7357905edc6d3a78044f900
          name="otp"
          value={otp}
          // maxLength={6}
          handleKeyDown={handleKeyDown}
        />
<<<<<<< HEAD
=======
        {/* 
>>>>>>> 733f0d7580621074a7357905edc6d3a78044f900
        {timeLeft > 0 ? (
          <p className="text-white">
            <span>Resend Otp after: {timeLeft} seconds</span>
          </p>
        ) : (
          showResendButton && (
            <div>
              <button
                onClick={resendOtp}
                className="bg-blue-700 text-white hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-blue-800"
              >
                Resend OTP
              </button>
            </div>
          )
        )}
      </div>
    </ModalWrapper>
  );
}

export default OtpValidationModal;
