/** @format */

import React, { useState } from "react";
import { EyeFill, EyeSlashFill, XLg } from "react-bootstrap-icons";
import Input from "../../components/input";
// import { apiHandler } from '../../services/axios';
// import { sendOTP, verifyOTP } from '../../services/Login';
import { useNavigate } from "react-router-dom";
import { ApiHandle } from "../../utils/ApiHandle";
import { OTP_SEND, OTP_VERIFY } from "../../utils/constants";
import Toaster from "../../utils/toaster/Toaster";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/reducers/userReducer";
import Loader from "../../components/loader/Loader";

function LoginPage() {
  const [loginWith, setLoginWith] = useState("email");
  const [formValue, setFormValue] = useState({});
  const [isOtp, setIsOtp] = useState(false);
  const [verifyUser, setVerifyUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleOTP = (e) => {
    const { name, value } = e.target;
    setVerifyUser({ ...formValue, [name]: value });
  };
  const SubmitOTP = async (e) => {
    e.preventDefault();
    const res = await ApiHandle(OTP_VERIFY, verifyUser, "POST");
    if (res.statusCode === 201) {
      setIsLoading(false);
      localStorage.setItem("token", res.responsePayload.access);
      localStorage.setItem("refresh", res.responsePayload.refresh);

      dispatch(setUserData(res?.responsePayload));
      localStorage.setItem(
        "p_station",
        res.responsePayload?.user_profile?.police_station?.id
      );
      navigate("/");
      Toaster("success", "User Verify Successfully!");

      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await ApiHandle(OTP_SEND, formValue, "POST");
      if (res.statusCode === 201) {
        setIsOtp(true);
        setIsLoading(false);
        Toaster("success", "OTP SENT Successfully!");

        return;
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const LoginWithMobile = () => (
    <>
      <div className="input-group mb-3   ">
        <Input
          onChange={handleChange}
          label={"Mobile No."}
          type="text"
          name="mobile_no"
          value={formValue?.mobile_no || ""}
          disabled={isOtp}
          min={6}
          maxLength="10"
          inputMode="numeric"
        />
      </div>
    </>
  );
  const LoginWithEmail = () => (
    <>
      <div className="input-group mb-3   ">
        <Input
          onChange={handleChange}
          label={"Email"}
          type="email"
          name="email"
          value={formValue?.email || ""}
          disabled={isOtp}
          textColor={"text-white"}
        />
      </div>
    </>
  );

  const Otp = () => (
    <div>
      <div className="input-group mb-3 flex flex-col align-items-center">
        <Input
          onChange={handleOTP}
          label={"Enter OTP"}
          type="number"
          name="otp"
          value={verifyUser?.otp}
          textColor={"text-white"}

        />

        <div
          className="col flex align-items-center justify-center mt-3"
          style={{
            background: "green",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            type="submit"
            className="btn ms-4"
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#ffffff",
              cursor: "pointer",
            }}
          >
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className=" h-[100vh]  flex justify-center items-center w-[100%] bgimg ">
      <div className="my-3d-watercolor-div">
        <div className="text-2xl font-extrabold	text-center text-white   ">Login</div>
        <div className=" flex justify-center gap-5 flex-col ">
          <form onSubmit={isOtp ? SubmitOTP : handleSubmit} className="">
            {loginWith === "email"
              ? LoginWithEmail()
              : loginWith === "mobile"
              ? LoginWithMobile()
              : ""}
            <div className="input-group mb-3" style={{ position: "relative" }}>
              <Input
              
                onChange={handleChange}
                className="custom-input"
                label={"Password"}
                type={showPassword ? "text" : "password"}
                name="password"
                value={formValue?.password || ""}
                disabled={isOtp}
                style={{ paddingRight: "40px" }} // Adjust paddingRight to accommodate the button
                textColor={"text-white"}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "65%",
                  transform: "translateY(-50%)",
                }}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeSlashFill /> : <EyeFill />}
              </button>
            </div>

            {isOtp ? (
              <>{Otp()}</>
            ) : (
              <>
                {isLoading ? (
                 <span className="text-white"> "Otp Sending..."</span>
                ) : (
                  <div className="col flex align-items-center justify-center">
                    <button
                      type="submit"
                      className="btn  ms-4 text-white bg-green-500 px-5 py-1 rounded"
                      style={{
                        fontSize: "18px",
                      }}
                      disabled={isLoading}
                    >
                      Login
                    </button>
                  </div>
                )}
                {loginWith === "email" ? (
                  <div className="text-primary text-center mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        return (
                          setLoginWith("mobile"),
                          setFormValue({}),
                          setIsOtp(false)
                        );
                      }}
                      className="font-semibold leading-6 text-white hover:text-indigo-500"
                    >
                      login with mobile?
                    </button>
                  </div>
                ) : (
                  <div className="text-primary text-center mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        return (
                          setLoginWith("email"),
                          setFormValue({}),
                          setIsOtp(false)
                        );
                      }}
                      className="font-semibold leading-6 text-white hover:text-indigo-500"
                    >
                      login with email?
                    </button>
                  </div>
                )}
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
