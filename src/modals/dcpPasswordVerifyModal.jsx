import React, {  useState } from "react";
import ModalWrapper from "../components/modalWrapper/ModalWrapper";
import { DCP_PASSWORD_VERIFY } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { ApiHandle } from "../utils/ApiHandle";
import Toaster from "../utils/toaster/Toaster";
import { DcpPassowrdConfirm, commonCloseModal } from "../redux/reducers/modalsReducer";
import Input from "../components/input";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader/Loader";

function DcpPasswordVerifyModal() {
  const [password, setPassword] = useState("");
  const navigate=useNavigate()
  const { requestId,dcpStatus } = useSelector((state) => state?.modal);
  const dispatch = useDispatch();
  const [loader,setLoader]=useState(false)





  const verifyPassword = async () => {
    setLoader(true)
    const res = await ApiHandle(
        DCP_PASSWORD_VERIFY,
      {form_id: requestId,password: password},
      "POST"
    );
    if (res.statusCode === 200) {
     
      dispatch(DcpPassowrdConfirm(true));
      dispatch(commonCloseModal());
      setLoader(false)
      return;
    }
    else{
        setLoader(false) 
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      verifyPassword()
    }
  }

  return (
   
    <ModalWrapper handleClick={verifyPassword} loader={loader} btnName={"Submit"}>
      <div className="flex flex-col gap-5">
        <span className="text-xl text-white">Enter Your Kavach OTP</span>
        <Input
          onChange={(e) => setPassword(e?.target?.value)}
          maxLength="6"
          inputMode="numeric"
          type="text"
          name="password"
          handleKeyDown={handleKeyDown}
        
        />
</div>
     
    </ModalWrapper>

    
  );
}

export default DcpPasswordVerifyModal;
