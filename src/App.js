import "antd/dist/antd.css";
import "./App.less";
import GeneralLayout from "./layouts/GeneralLayout";
import Home from "./views/Home";
import Filters from "./components/Filters.jsx";
import PostVideo from "./views/PostVideo";
import { useState, useEffect } from "react";
import axiosInstance from "./util/axios";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

function App({ history }) {
  const [homePageAds, setHomePageAds] = useState(null);
  const [reqLabels, setReqLabels] = useState([]);
  const [reqBrand, setReqBrand] = useState(null);
  const [reqSearch, setReqSearch] = useState(null);

  useEffect(() => {
    fetchFilteredAds();
  }, [reqLabels, reqBrand]);

  const fetchFilteredAds = () => {
    urlChanger();
    axiosInstance
      .get(urlGenerator())
      .then((res) => {
        if (res.data.data) {
          setHomePageAds(res.data.data);
        } else {
          setHomePageAds(res.data);
        }
      })
      .catch((err) => console.log(err.message));
  };

  const pushReqLabel = (label) => {
    if (reqLabels.indexOf(label) === -1) setReqLabels([...reqLabels, label]);
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

  const urlGenerator = () => {
    if (reqLabels.length > 0 || reqBrand || reqSearch) {
      return `ad/result?${reqSearch ? `search=${reqSearch}` : ""}${
        reqLabels.length > 0 ? `&labels=${reqLabels.join()}` : ""
      }${reqBrand ? `&brand=${reqBrand}` : ""}`;
    } else {
      return "ad";
    }
  };

  const urlChanger = () => {
    if (urlGenerator() !== "ad") {
      history.push("/");
      history.push(urlGenerator());
    } else {
      history.push("/");
    }
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
              setReqSearch={setReqSearch}
              reqSearch={reqSearch}
              fetchFilteredAds={fetchFilteredAds}
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

export default withRouter(App);
