import { useSelector } from "react-redux";
import RejectModal from "./modals/rejectModal";
import AppRoute from "./routes/rootRouting";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewLogsModal from "./modals/vearLogs";
import OtpValidationModal from "./modals/otpValidationModal";
import DcpPasswordVerifyModal from "./modals/dcpPasswordVerifyModal";
function App() {
  const {rejectModal,viewLogModal,otpValidationModal,dcpPasswordVerify}=useSelector((state)=>state?.modal)
  return (
    <div>
 
      <BrowserRouter>
        <AppRoute />
        <ToastContainer />
        {rejectModal&&<RejectModal/>}
      {viewLogModal&&<ViewLogsModal/>}
      {otpValidationModal && <OtpValidationModal/>}
      {otpValidationModal && <OtpValidationModal/>}
      {dcpPasswordVerify && <DcpPasswordVerifyModal/>}
      </BrowserRouter>
    </div>
  );
}


export default App;
