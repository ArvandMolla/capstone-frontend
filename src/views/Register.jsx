import { Input, Button, Divider } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import GoogleLogo from "../components/GoogleLogo.jsx";
import { withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../util/axios";

function Register({ history }) {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [newUserId, setNewUserId] = useState(null);
  const [JWT, setJWT] = useState(null);

  useEffect(() => {
    if (newUserId) {
      loginUser();
    }
  }, [newUserId]);

  useEffect(() => {
    if (JWT) {
      localStorage.setItem("accessToken", JWT);
    }
  }, [JWT]);

  const postNewUser = () => {
    const newUser = {
      name,
      email,
      password,
      avatar: `https://picsum.photos/id/${
        Math.floor(Math.random() * (1084 - 1000)) + 1000
      }/100/100`,
    };
    axiosInstance
      .post("/user/register", newUser)
      .then((res) => {
        setNewUserId(res.data._id);
      })
      .catch((err) => console.log(err.message));
  };

  const loginUser = () => {
    const credentials = {
      email,
      password,
    };
    axiosInstance
      .post("/user/login", credentials)
      .then((res) => {
        setJWT(res.data.accessToken);
        history.push("/post-video");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <img
          src="../img/30seconds-logo.png"
          alt="30seconds logo"
          className="login-logo"
          onClick={() => {
            history.push("/");
          }}
        />
      </div>
      <div className="login-body">
        <div className="login-title">
          <h1>Register</h1>
        </div>
        <div className="inputs">
          <Input
            size="large"
            placeholder=" Name"
            prefix={<UserOutlined />}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            size="large"
            placeholder=" Email"
            prefix={<MailOutlined />}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input.Password
            prefix={<LockOutlined />}
            size="large"
            placeholder=" Choose a password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="login-button">
          <Button type="primary" onClick={() => postNewUser()}>
            Register
          </Button>
        </div>
        <div className="divider">
          <Divider>Or</Divider>
        </div>
        <div>
          <Button icon={<GoogleLogo />} size="large">
            Sign in with Google
          </Button>
        </div>
        <div className="divider">
          <Divider>Already member?</Divider>
        </div>
        <div className="register-button">
          <Button
            type="link"
            size="large"
            onClick={() => history.push("/login")}
          >
            Login here
          </Button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Register);
