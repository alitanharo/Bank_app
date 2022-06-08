import { ToastContainer } from "react-toastify";
import MainRouter from "./components/MainRouter";
import Provider from "./context/Provider";

function App() {
  return (
    <Provider>
      <div className="bg-light" style={{ minHeight: "100vh" }}>
        <MainRouter />
        <ToastContainer />
      </div>
    </Provider>
  );
}

export default App;
