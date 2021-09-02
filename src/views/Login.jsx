import { Input, Button, Divider } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import GoogleLogo from "../components/GoogleLogo.jsx";
import { withRouter } from "react-router-dom";
function Login({ history }) {
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
          <Input size="large" placeholder=" Email" prefix={<MailOutlined />} />
          <Input.Password
            prefix={<LockOutlined />}
            size="large"
            placeholder=" Password"
          />
        </div>
        <div className="login-button">
          <Button type="primary">Login</Button>
        </div>
        <div className="divider">
          <Divider>Or</Divider>
        </div>
        <div>
          <Button icon={<GoogleLogo />} size="large">
            Login with Google
          </Button>
        </div>
        <div className="divider">
          <Divider>New user?</Divider>
        </div>
        <div className="register-button">
          <Button type="link" size="large">
            Register now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
