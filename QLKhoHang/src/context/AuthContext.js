import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../config";
// import  { Redirect } from 'react-router-dom'
// import {useNavigation} from "@react-navigation/native";
// import { useNavigation } from '@react-navigation/native'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const navigation = useNavigation();
  const [checkValueSignUp, setCheckValueSignUp] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const signUP = (
    username,
    password,
    confirmPassword,
    address,
    phone,
    email,
    checkValue,
  ) => {
    // console.log(">>>>> check",username,password,confirmPassword,address,phone,email);
    setIsLoading(true);
    setCheckValueSignUp(true);
    // console.log( username,
    //   password,
    //   confirmPassword,
    //   address,
    //   phone,
    //   email,checkValue);
      let check ='';
      if (checkValue) {
        check= '1';
      }else
      {
        check='2'
      }
      // console.log(">>>>>>>>>>>>>>>check",check)
    axios
      .post(`${BASE_URL}/register?status=`+check, {
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        address: address,
        email: email,
        phone: phone,
      })
      .then((res) => {
        console.log(res);
        let userInfo = res;
        console.log(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
        setCheckValueSignUp(true);
        // <Redirect to='/Login'/>
        // window.location.href="/Login";
        // navigation.navigate("/Login");
      })
      .catch((e) => {
        console.log(`register error ${e.res}`);
        setIsLoading(false);
        setCheckValueSignUp(false);
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
      .get(
        `${BASE_URL}/logout`,
        {
          headers: { Authorization: `Token ${userInfo.accessToken}` }
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

  const updateProfile = (address, phone, email) => {
    setIsLoading(true);
    axios
      .put(`${BASE_URL}/update-account`, {
        address: address,
        email: email,
        phone: phone,
      }, {
        headers: { Authorization: `Token ${userInfo.accessToken}` }
      })
      .then((res) => {
        let userInfo = res;
        console.log(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`update error ${e.res}`);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        checkValueSignUp,
        splashLoading,
        signUP,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
