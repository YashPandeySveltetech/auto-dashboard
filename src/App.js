import RejectModal from "./modals/rejectModal";
import AppRoute from "./routes/rootRouting";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <RejectModal/>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </div>
  );
}

export default App;
