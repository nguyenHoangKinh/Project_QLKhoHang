import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../config";
// import {useNavigation} from "@react-navigation/native";

export const AuthContext = createContext();

export const AuthProvider = ({ children}) => {
  // const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const signUP = (
    username,
    password,
    confirmPassword,
    address,
    phone,
    email
  ) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/register?status=2`, {
        username,
        password,
        confirmPassword,
        address,
        phone,
        email
      })
      .then((res) => {
        let userInfo = res.data;
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        console.log(userInfo);
        setIsLoading(false);
        console.log(userInfo);
      })
      .catch((e) => {
        console.log(`register error ${e.response.data}`);
        setIsLoading(false);
      });
  };

  const login = (username, password) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/login`, {
        username,
        password,
      })
      .then((res) => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        // AsyncStorage.setItem("accessToken",userInfo.accessToken, JSON.stringify(userInfo.accessToken));
        // AsyncStorage.setItem("message",userInfo.message, JSON.stringify(userInfo.message));
        // AsyncStorage.setItem("others",userInfo.others, JSON.stringify(userInfo.others));
        // setUserInfo(userInfo.accessToken);
        // navigation.navigate('Home');
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.access_token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        AsyncStorage.removeItem("userInfo");
        setUserInfo({});
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo, 
        splashLoading,
        signUP,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
