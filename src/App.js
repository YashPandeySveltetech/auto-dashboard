import { useSelector } from "react-redux";
import RejectModal from "./modals/rejectModal";
import AppRoute from "./routes/rootRouting";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewLogsModal from "./modals/vearLogs";
import OtpValidationModal from "./modals/otpValidationModal";
import DcpPasswordVerifyModal from "./modals/dcpPasswordVerifyModal";
import PasswordChangeModal from "./modals/passwordChangeModal";
import { useEffect } from "react";
function App() {
  const {
    rejectModal,
    viewLogModal,
    otpValidationModal,
    dcpPasswordVerify,
    passwordChangeModal,
  } = useSelector((state) => state?.modal);
  useEffect(() => {
    const handleOnline = () => {
      toast.dismiss(); // Dismiss any existing offline toasts
      toast.success("Internet is back online!", { autoClose: 1000 });
    };

    const handleOffline = () => {
      toast.error("Internet is off!", { autoClose: false });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Check the initial online status
    if (!navigator.onLine) {
      handleOffline();
    }

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div>
      <BrowserRouter>
        <AppRoute />
        <ToastContainer />
        {rejectModal && <RejectModal />}
        {viewLogModal && <ViewLogsModal />}
        {otpValidationModal && <OtpValidationModal />}

        {dcpPasswordVerify && <DcpPasswordVerifyModal />}
        {passwordChangeModal && <PasswordChangeModal />}
      </BrowserRouter>
    </div>
  );
}

export default App;
