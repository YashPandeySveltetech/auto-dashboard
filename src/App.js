import AppRoute from "./routes/rootRouting";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div>
      <BrowserRouter>
        <AppRoute />
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}


export default App;
