import "antd/dist/antd.css";
import "./App.less";
import GeneralLayout from "./layouts/GeneralLayout";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import PostVideo from "./views/PostVideo";
import Details from "./views/Details";
import Filters from "./components/Filters.jsx";
import MobileMenu from "./components/MobileMenu.jsx";

import DetailsTitle from "./components/DetailsTitle.jsx";
import PostVideoTitle from "./components/PostVideoTitle.jsx";
import FromGoogle from "./components/FromGoogle.jsx";
import { useState, useEffect } from "react";
import axiosInstance from "./util/axios";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

function App({ history, location }) {
  const [isLoggedin, setIsloggedin] = useState(false);
  const [homePageAds, setHomePageAds] = useState(null);
  const [reqLabels, setReqLabels] = useState([]);
  const [reqBrand, setReqBrand] = useState(null);
  const [reqSearch, setReqSearch] = useState(null);
  const [urlParams, setUrlParams] = useState("/ad");
  const [totalItems, setTotalItems] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [adTitle, setAdTitle] = useState(null);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    axiosInstance.get("/user/is-loggedin", { headers }).then((res) => {
      if (res.status === 200) {
        setIsloggedin(true);
      }
    });
  };

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
    if (urlGenerator() === "other") {
      return;
    } else {
      if (urlGenerator() !== "/") {
        history.push("/");
        history.push(urlGenerator());
        setUrlParams(urlGenerator());
      } else {
        history.push("/");
        setUrlParams("/ad");
        setTotalItems(null);
      }
    }
  };

  const urlGenerator = () => {
    if (location.pathname === "/" || location.pathname === "/result") {
      if (reqLabels.length > 0 || reqBrand || reqSearch) {
        return `result?${reqSearch ? `search=${reqSearch}` : ""}${
          reqLabels.length > 0 ? `&labels=${reqLabels.join()}` : ""
        }${reqBrand ? `&brand=${reqBrand}` : ""}${
          currentPage !== 1 ? `&page=${currentPage}` : ""
        }`;
      } else {
        return `${currentPage !== 1 ? `?page=${currentPage}` : "/"}`;
      }
    } else {
      return "other";
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
      <MobileMenu />
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
                  setUrlParams={setUrlParams}
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
              isLoggedin={isLoggedin}
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
            <GeneralLayout
              view={
                <PostVideo
                  isLoggedin={isLoggedin}
                  setIsloggedin={setIsloggedin}
                  homePageAds={homePageAds}
                  fetchFilteredAds={fetchFilteredAds}
                />
              }
              filters={<PostVideoTitle postVideoTitle="Post your video" />}
              isLoggedin={isLoggedin}
              setReqSearch={setReqSearch}
              reqSearch={reqSearch}
              urlChanger={urlChanger}
              {...routerProps}
            />
          )}
          path="/post-video"
          exact
        />
        <Route
          render={(routerProps) => (
            <GeneralLayout
              view={
                <Details
                  pushReqLabel={pushReqLabel}
                  setReqBrand={setReqBrand}
                  fetchFilteredAds={fetchFilteredAds}
                  isLoggedin={isLoggedin}
                  setAdTitle={setAdTitle}
                />
              }
              filters={<DetailsTitle adTitle={adTitle} />}
              isLoggedin={isLoggedin}
              setReqSearch={setReqSearch}
              reqSearch={reqSearch}
              urlChanger={urlChanger}
              {...routerProps}
            />
          )}
          path="/details/:id"
        />
        <Route
          render={(routerProps) => <Register {...routerProps} />}
          path="/register"
          exact
        />
        <Route
          render={(routerProps) => <Login {...routerProps} />}
          path="/login"
          exact
        />
        <Route
          render={(routerProps) => <FromGoogle {...routerProps} />}
          path="/from-google"
        />
      </Switch>
    </Router>
  );
}

export default withRouter(App);
