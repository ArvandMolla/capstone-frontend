import "antd/dist/antd.css";
import "./App.css";
import GeneralLayout from "./layouts/GeneralLayout";
import Home from "./views/Home";

function App() {
  return (
    <div>
      <GeneralLayout view={<Home />} />
    </div>
  );
}

export default App;
