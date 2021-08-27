import "antd/dist/antd.css";
import "./App.less";
import GeneralLayout from "./layouts/GeneralLayout";
import Home from "./views/Home";
import Filters from "./components/Filters.jsx";
import PostVideo from "./views/PostVideo";
import { useState, useEffect } from "react";
import axiosInstance from "./util/axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [homePageAds, setHomePageAds] = useState(null);
  const [reqLabels, setReqLabels] = useState([]);
  const [reqBrand, setReqBrand] = useState(null);

  useEffect(() => {
    fetchHomePageAds();
  }, []);

  useEffect(() => {
    if (homePageAds) {
      fetchFilteredAds();
    }
  }, [JSON.stringify(reqLabels), reqBrand]);

  const fetchHomePageAds = () => {
    axiosInstance
      .get("/ad")
      .then((res) => {
        setHomePageAds(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  const pushReqLabel = (label) => {
    setReqLabels([...reqLabels, label]);
  };

  const removeReqLabels = (label) => {
    console.log("removing ...", label);
    let newReqLabels = [...reqLabels];
    let index = newReqLabels.indexOf(label);
    if (index !== -1) {
      newReqLabels.splice(index, 1);
    }
    console.log(newReqLabels);
    setReqLabels(newReqLabels);
  };

  const fetchFilteredAds = () => {
    axiosInstance
      .get(
        `ad/result?labels=${reqLabels.join()}&${
          reqBrand ? `brand=${reqBrand}` : ""
        }`
      )
      .then((res) => {
        setHomePageAds(res.data.data);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <Router>
      <Switch>
        <Route
          render={(routerProps) => (
            <GeneralLayout
              view={
                <Home
                  homePageAds={homePageAds}
                  pushReqLabel={pushReqLabel}
                  setReqBrand={setReqBrand}
                />
              }
              filters={
                <Filters
                  reqLabels={reqLabels}
                  reqBrand={reqBrand}
                  setReqLabels={setReqLabels}
                  setReqBrand={setReqBrand}
                  removeReqLabels={removeReqLabels}
                />
              }
              {...routerProps}
            />
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
