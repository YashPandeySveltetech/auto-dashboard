/** @format */

import React, { useState } from 'react';
import { XLg } from 'react-bootstrap-icons';
import Input from '../../components/input';
// import { apiHandler } from '../../services/axios';
// import { sendOTP, verifyOTP } from '../../services/Login';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

 const [loginWith, setLoginWith] = useState("email");
  const [formValue, setFormValue] = useState({});
  const [isOtp, setIsOtp] = useState(false);
  const [verifyUser, setVerifyUser] = useState({});

  const navigate = useNavigate();

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
	// apiHandler(() => verifyOTP({ payload: verifyUser }), {
    //     onSuccess: (data) => {
	// 		localStorage.setItem("ss_tkn",data?.data?.access)
         
    //     },
    //     onError: (e) => {
    //      console.log("eror")
    //     },
    //     final: () => {
        
    //     },
    //   });
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();
	// apiHandler(() => sendOTP({ payload: formValue }), {
    //     onSuccess: (data) => {
	// 		setIsOtp(true);
         
    //     },
    //     onError: (e) => {
    //      console.log("eror")
	// 	 setIsOtp(false);
    //     },
    //     final: () => {
        
    //     },
    //   });
   
  };

 

  const LoginWithMobile = () => (
    <>
      <div className="input-group mb-3 flex align-items-center ">
	  <Input onChange={handleChange} label={"Mobile No."} type='text'  name="mobile_no"  
            value={formValue?.mobile_no || ""}
            disabled={isOtp}   min={6}
            maxLength="10"
            inputMode="numeric"/>

     
      </div>

      <div className="text-primary text-end">
        <button
          type="button"
          onClick={() => {
            return setLoginWith("email"), setFormValue({}),setIsOtp(false);
          }}
          className="btn btn-outline-primary"
        >
          login with email?
        </button>
      </div>
    </>
  );
  const LoginWithEmail = () => (
    <>
      <div className="input-group mb-3 flex align-items-center ">
	  <Input onChange={handleChange} label={"Email"} type='email'  name="email"  
           value={formValue?.email || ""}
		   disabled={isOtp}/>

      
      </div>

      <div className="text-primary text-end">
        <button
          type="button"
          onClick={() => {
            return setLoginWith("mobile"), setFormValue({}),setIsOtp(false)
          }}
          className="btn btn-outline-primary"
        >
          login with mobile?
        </button>
      </div>
    </>
  );

  const Otp = () => (
    <div>
      <div className="input-group mb-3 flex align-items-center">
	  <Input   onChange={handleOTP} label={"Enter OTP"} type='number'  name="otp"  
         value={verifyUser?.otp}
		   disabled={isOtp} />

        <div className="col flex align-items-center justify-center">
          <button type="submit" className="btn btn-primary my-3 ms-4 ">
           Verify OTP
          </button>
        </div>
      </div>
    </div>
  );


	return (
		<div className='bg-gradient-to-r from-cyan-300 to-purple-700 h-[100vh]  flex justify-center items-center w-[100%] '>
			<div className='bg-white flex relative justify-center gap-5 flex-col text-black  p-5 border rounded  w-[20rem]'>
       
				<div className='text-2xl font-extrabold	text-center '>Login</div>
				<div className=' flex justify-center gap-5 flex-col'>
				<form onSubmit={isOtp ? SubmitOTP : handleSubmit} className="">
          
            {loginWith === "email"
              ? LoginWithEmail()
              : loginWith === "mobile"
              ? LoginWithMobile()
              : ""}
            <div className="input-group mb-3 flex align-items-center">
			<Input   onChange={handleChange} label={"Password"} type='password'  name="password"  
         value={formValue?.password || ""}
		   disabled={isOtp} />
             
            </div>
            {isOtp ? (
              <>{Otp()}</>
            ) : (
              <div className="flex align-items-end justify-center">
                <button
                  type="submit"
                  className="btn buttonColor my-3 ms-4 text-white"
                  style={{
                    fontSize: "18px",
                  }}
                >
                  Login
                </button>
              </div>
            )}
          </form>

				</div>
				</div>
				

			
			
		</div>
	);
}

export default LoginPage;
