import { Input, Button, Divider } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import GoogleLogo from "../components/GoogleLogo.jsx";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axiosInstance from "../util/axios";

function Login({ history }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [JWT, setJWT] = useState(null);

  useEffect(() => {
    if (JWT) {
      localStorage.setItem("accessToken", JWT);
    }
  }, [JWT]);

  const loginUser = () => {
    const credentials = {
      email,
      password,
    };
    axiosInstance
      .post("/user/login", credentials)
      .then((res) => {
        setJWT(res.data.accessToken);
        history.push("/");
        window.location.reload(false);
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
          <h1>Login</h1>
        </div>
        <div className="inputs">
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
            placeholder=" Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="login-button">
          <Button type="primary" onClick={() => loginUser()}>
            Login
          </Button>
        </div>
        <div className="divider">
          <Divider>Or</Divider>
        </div>
        <div>
          <Button
            icon={<GoogleLogo />}
            size="large"
            href="http://localhost:5000/api/user/google-login"
          >
            Login with Google
          </Button>
        </div>
        <div className="divider">
          <Divider>New user?</Divider>
        </div>
        <div className="register-button">
          <Button
            type="link"
            size="large"
            onClick={() => {
              history.push("/register");
            }}
          >
            Register now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
