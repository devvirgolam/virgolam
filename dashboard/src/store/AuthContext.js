import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation, useLogoutMutation } from "../api/authApi";
import { useGetCurrentUserQuery } from "../api/userApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    user: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();

  // Fetch user directly if accessToken exists
  const {
    data: userData,
    error: userError,
    refetch,
  } = useGetCurrentUserQuery(undefined, {
    skip: !authState.accessToken,
  });

  useEffect(() => {
    if (userData) {
      setAuthState((prev) => ({ ...prev, user: userData }));
    }
    if (userError && userError.status === 401) {
      handleLogout(); // auto logout if unauthorized
    }
  }, [userData, userError]);

  // Refresh access token
  const refreshAccessToken = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: authState.refreshToken }),
      });
      if (!response.ok) throw new Error("Token refresh failed");
      const { accessToken } = await response.json();
      localStorage.setItem("accessToken", accessToken);
      setAuthState((prev) => ({ ...prev, accessToken }));
      await refetch(); // refetch user data after token refresh
      return accessToken;
    } catch (error) {
      console.error("Token refresh failed:", error);
      handleLogout();
      return null;
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const { accessToken, refreshToken, user } = await login(
        credentials
      ).unwrap();
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setAuthState({ accessToken, refreshToken, user });
      navigate("/dashboard");
      return { success: true };
    } catch (error) {
      return { success: false, error: error?.data?.error || "Login failed" };
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAuthState({ accessToken: null, refreshToken: null, user: null });
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        login: handleLogin,
        logout: handleLogout,
        refreshToken: refreshAccessToken,
        refetchUser: refetch, // optional: let consumers manually refetch user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
