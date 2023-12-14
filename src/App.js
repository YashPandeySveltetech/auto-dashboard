import { useSelector } from "react-redux";
import RejectModal from "./modals/rejectModal";
import AppRoute from "./routes/rootRouting";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewLogsModal from "./modals/vearLogs";
function App() {
  const {rejectModal,viewLogModal}=useSelector((state)=>state?.modal)
  // console.log(reject,'reject');
  return (
    <div>
      {rejectModal&&<RejectModal/>}
      {viewLogModal&&<ViewLogsModal/>}
      <BrowserRouter>
        <AppRoute />
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}


export default App;
