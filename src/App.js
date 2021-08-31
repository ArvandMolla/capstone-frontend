import "antd/dist/antd.css";
import "./App.less";
import GeneralLayout from "./layouts/GeneralLayout";
import Home from "./views/Home";
import PostVideo from "./views/PostVideo";
import Details from "./views/Details";
import Filters from "./components/Filters.jsx";
import { useState, useEffect } from "react";
import axiosInstance from "./util/axios";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

function App({ history, location }) {
  const [homePageAds, setHomePageAds] = useState(null);
  const [reqLabels, setReqLabels] = useState([]);
  const [reqBrand, setReqBrand] = useState(null);
  const [reqSearch, setReqSearch] = useState(null);
  const [urlParams, setUrlParams] = useState("/ad");
  const [totalItems, setTotalItems] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   fetchFilteredAds();
  // }, [reqLabels, reqBrand]);

  useEffect(() => {
    urlChanger();
  }, [reqLabels, reqBrand]);

  useEffect(() => {
    fetchFilteredAds();
  }, [urlParams]);

  useEffect(() => {
    urlChanger();
  }, [currentPage]);

  const fetchFilteredAds = () => {
    axiosInstance
      .get(
        `${
          location.search
            ? `/ad` + `${location.pathname}` + `${location.search}`
            : "/ad"
        }`
      )
      .then((res) => {
        setHomePageAds(res.data.data);
        setTotalItems(res.data.total);
      })
      .catch((err) => console.log(err.message));
  };

  const urlChanger = () => {
    if (urlGenerator() !== "/") {
      history.push("/");
      history.push(urlGenerator());
      setUrlParams(urlGenerator());
    } else {
      history.push("/");
      setUrlParams("/ad");
      setTotalItems(null);
    }
  };

  const urlGenerator = () => {
    if (reqLabels.length > 0 || reqBrand || reqSearch) {
      return `result?${reqSearch ? `search=${reqSearch}` : ""}${
        reqLabels.length > 0 ? `&labels=${reqLabels.join()}` : ""
      }${reqBrand ? `&brand=${reqBrand}` : ""}${
        currentPage !== 1 ? `&page=${currentPage}` : ""
      }`;
    } else {
      return `${currentPage !== 1 ? `?page=${currentPage}` : "/"}`;
    }
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
                  totalItems={totalItems}
                  urlChanger={urlChanger}
                  setCurrentPage={setCurrentPage}
                />
              }
              filters={
                <Filters
                  reqLabels={reqLabels}
                  reqBrand={reqBrand}
                  setReqLabels={setReqLabels}
                  setReqBrand={setReqBrand}
                  removeReqLabels={removeReqLabels}
                  totalItems={totalItems}
                />
              }
              setReqSearch={setReqSearch}
              reqSearch={reqSearch}
              urlChanger={urlChanger}
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
        <Route
          render={(routerProps) => (
            <GeneralLayout view={<Details />} {...routerProps} />
          )}
          path="/details/:id"
        />
      </Switch>
    </Router>
  );
}

export default withRouter(App);
