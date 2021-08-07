import "antd/dist/antd.css";
import "./App.css";
import GeneralLayout from "./layouts/GeneralLayout";
import Home from "./views/Home";
import PostVideo from "./views/PostVideo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route
          render={(routerProps) => (
            <GeneralLayout view={<Home />} {...routerProps} />
          )}
          path="/"
          exact
        />
        <Route
          render={(routerProps) => (
            <GeneralLayout view={<PostVideo />} {...routerProps} />
          )}
          path="/post-video"
          exact
        />
      </Switch>
    </Router>
  );
}

export default App;
