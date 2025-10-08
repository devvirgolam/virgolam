import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
} from "../api/authApi";
import { useGetCurrentUserQuery } from "../api/userApi";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Safely parse user from localStorage
  let initialUser = null;
  const userFromStorage = localStorage.getItem("user");
  if (userFromStorage && userFromStorage !== "undefined") {
    try {
      initialUser = JSON.parse(userFromStorage);
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      localStorage.removeItem("user"); // Clear invalid user data
    }
  }

  const [authState, setAuthState] = useState({
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    user: initialUser,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();
  const [refresh] = useRefreshMutation();

  const {
    data: userData,
    error: userError,
    isLoading,
    refetch,
  } = useGetCurrentUserQuery(undefined, {
    skip: !authState.accessToken,
  });

  useEffect(() => {
    console.log(
      "userData:",
      userData,
      "userError:",
      userError,
      "isLoading:",
      isLoading
    );
    if (userData) {
      setAuthState((prev) => ({ ...prev, user: userData }));
      localStorage.setItem("user", JSON.stringify(userData || {})); // Ensure valid data
    }
    if (userError && (userError.status === 401 || userError.status === 403)) {
      handleRefreshToken();
    }
  }, [userData, userError, isLoading]);

  const handleRefreshToken = async () => {
    try {
      const { accessToken } = await refresh(authState.refreshToken).unwrap();
      localStorage.setItem("accessToken", accessToken);
      setAuthState((prev) => ({ ...prev, accessToken }));
      await refetch();
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
      localStorage.setItem("user", JSON.stringify(user || {})); // Ensure valid data
      setAuthState({ accessToken, refreshToken, user });
      navigate("/");
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
    localStorage.removeItem("user");
    setAuthState({ accessToken: null, refreshToken: null, user: null });
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        login: handleLogin,
        logout: handleLogout,
        refreshToken: handleRefreshToken,
        refetchUser: refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
