// src/components/Login/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, Card, Typography, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../../store/AuthContext";
import { useForgotPasswordMutation } from "../../api/authApi";
import logo from "../../assets/img/logo.jpeg";

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const [forgotPassword] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const result = await login({
        email: values.email,
        password: values.password,
      });

      if (result.success) {
        message.success("Login successful!");
        navigate("/");
      } else {
        message.error(result.error || "Invalid credentials");
      }
    } catch (err) {
      message.error(err?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (email) => {
    if (!email) {
      message.warning("Please enter your email first");
      return;
    }
    try {
      await forgotPassword({ email }).unwrap();
      message.success("Password reset link sent to your email");
    } catch (err) {
      message.error(err?.data?.message || "Failed to send reset link");
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <Card className="login-card" bordered={false}>
          <div className="login-header">
            <img src={logo} alt="CRMS Logo" className="login-logo" />
            <Title level={3} className="login-title">
              Sign in to CRMS
            </Title>
            <Text type="secondary" className="login-subtitle">
              Access your account using your email and password
            </Text>
          </div>

          <Form
            name="login-form"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            className="login-form"
          >
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: "Please enter your email address" },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Enter your email"
                disabled={loading}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
                disabled={loading}
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox disabled={loading}>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                className="login-button"
              >
                Sign In
              </Button>
            </Form.Item>

            <div className="login-footer-links">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  const email = document.querySelector(
                    'input[name="email"]'
                  )?.value;
                  handleForgotPassword(email);
                }}
              >
                Forgot password?
              </a>
            </div>
          </Form>

          <div className="login-footer">
            <Text type="secondary">
              © {new Date().getFullYear()} CRMS. All rights reserved.
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
