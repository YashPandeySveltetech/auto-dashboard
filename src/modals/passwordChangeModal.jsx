import React, {  useState } from "react";
import ModalWrapper from "../components/modalWrapper/ModalWrapper";
import { CHANGE_PASSWORD } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { ApiHandle } from "../utils/ApiHandle";
import Toaster from "../utils/toaster/Toaster";
import {commonCloseModal } from "../redux/reducers/modalsReducer";
import Input from "../components/input";


function PasswordChangeModal() {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const { userData } = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const [loader,setLoader]=useState(false)





  const verifyPassword = async () => {
    setLoader(true)
    if(password===confirmpassword){
        const res = await ApiHandle(
           `${CHANGE_PASSWORD}${userData?.id}/`,
          {password: password},
          "PATCH"
        );
        if (res.statusCode === 200) {
            Toaster("success",'Password Change Successfully')
          dispatch(commonCloseModal());
          setLoader(false)
          return;
        }
        else{
            setLoader(false) 
        }
    }
    else{
        Toaster("",'confirm Password not matched')
        setLoader(false) 
    }
  
  };
  function check() {

    var message = document.getElementById("message");

    var goodColor = "#0C6";
    var badColor = "#FF9B37";

    if (confirmpassword !== password) {
   
      message.style.color = badColor;
      message.innerHTML = "password not matched";
    } else {
    
      message.style.color = goodColor;
      message.innerHTML = "";
    }
  }

  return (
   
    <ModalWrapper handleClick={verifyPassword} loader={loader} btnName={"Submit"}>
      <div className="flex flex-col gap-5">
        <div>
        <span className="text-xl text-white">Enter Your New Password</span>
        <Input
          onChange={(e) => setPassword(e?.target?.value)}
          type="password"
          name="password"
        />
    
        </div>
        <div>
        <span className="text-xl text-white">Confirm Password</span>
        <Input
          onChange={(e) => setConfirmPassword(e?.target?.value)}
          type="password"
          name="changepassword"
          onKeyUp={check}
        />
        <span id="message"></span>
        </div>
        
</div>
     
    </ModalWrapper>

    
  );
}

export default PasswordChangeModal;
