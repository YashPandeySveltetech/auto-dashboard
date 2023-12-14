import { useSelector } from "react-redux";
import RejectModal from "./modals/rejectModal";
import AppRoute from "./routes/rootRouting";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const {rejectModal}=useSelector((state)=>state?.modal)
  // console.log(reject,'reject');
  return (
    <div>
      {rejectModal&&<RejectModal/>}
      <BrowserRouter>
        <AppRoute />
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}


export default App;
