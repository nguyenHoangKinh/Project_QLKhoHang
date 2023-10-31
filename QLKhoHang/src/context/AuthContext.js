import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../config";
// import {useNavigation} from "@react-navigation/native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [checkValue, setCheckValue] = useState(false);

  const signUP = (
    username,
    password,
    confirmPassword,
    address,
    phone,
    email
  ) => {
    // console.log(">>>>> check",username,password,confirmPassword,address,phone,email);
    setIsLoading(true);
    // let acc = {
    //   username,
    //   password,
    //   confirmPassword,
    //   address,
    //   email,
    //   phone,
    // };
    console.log( username,
      password,
      confirmPassword,
      address,
      phone,
      email);
    axios
      .post(`${BASE_URL}/register?status=2`, {
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        address: address,
        email: email,
        phone: phone,
      })
      .then((res) => {
        console.log(res);
        let userInfo = res.data;
        console.log(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`register error ${e.res}`);
        setIsLoading(false);
      });
      // console.log(`data `, username,
      // password,
      // confirmPassword,
      // address,
      // phone,
      // email);
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
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  // const logout = () => {
  //   setIsLoading(true);

  //   axios
  //     .post(
  //       `${BASE_URL}/logout`,
  //       {},
  //       {
  //         headers: { accessToken: `Bearer ${userInfo.accessToken}` },
  //       }
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //       AsyncStorage.removeItem("userInfo");
  //       setUserInfo({});
  //       setIsLoading(false);
  //     })
  //     .catch((e) => {
  //       console.log(`logout error ${e}`);
  //       setIsLoading(false);
  //     });
  // };

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
        // logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
