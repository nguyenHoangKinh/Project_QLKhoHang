import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import {Alert} from "react-native";
import { BASE_URL,ORDER_URL } from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [checkValueSignUp, setCheckValueSignUp] = useState(false);
  const [check, setCheck] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading,setSplashLoading ] = useState(false);
  const [checkSignUp, setCheckSignUp] = useState(false);
  const [formError, setFormError] = useState({});
  const [ListOrder, setListOrder] = useState({});
  const [IdOrder, setIdOrder] = useState({});
  const [DetailOrder, setDetailOrder] = useState({});
// console.log(userInfo);
  const signUP = (
    usernames,
    passwords,
    confirmPasswords,
    addresses,
    phones,
    emails,
    checkValue,
  ) => {
    const isEmptyValue = (value) => {
      return !value || value.trim().length < 1;
    };
    const validateForm = () => {
      const error = {};
  
      if (isEmptyValue(usernames)) {
        error["username"] = "Username is required";
      }
  
      if (isEmptyValue(addresses)) {
        error["address"] = "Address is required";
      }
  
      if (isEmptyValue(emails)) {
        error["email"] = "Email is required";
      }
  
      if (isEmptyValue(phones)) {
        error["phone"] = "Phone is required";
      }
  
      if (isEmptyValue(passwords)) {
        error["password"] = "Password is required";
      }
  
      if (isEmptyValue(confirmPasswords)) {
        error["confirmPassword"] = "Confirm Password is required";
      } else if (confirmPasswords !== passwords) {
        error["confirmPassword"] = "Confirm Password not match";
      }
      setFormError(error);
  
      return Object.keys(error).length === 0;
    };
    if (validateForm()) {
      let acc = {
        username: usernames,
        password: passwords,
        confirmPassword: confirmPasswords,
        address: addresses,
        phone: phones,
        email: emails,
      };
    setIsLoading(true);
    setCheckValueSignUp(true);
      let check ='';
      if (checkValue) {
        check= '1';
      }else
      {
        check='0'
      }
    axios
      .post(`${BASE_URL}/register?status=`+check, acc)
      .then((res) => {
        let userInfo = res;
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
        setCheckValueSignUp(true);
        setCheckSignUp(true);
      })
      .catch((e) => {
        console.log(`register error ${e.response.data.message}`);
        setIsLoading(false);
        setCheckValueSignUp(false);
      });
    }else{
      setCheckSignUp(false);
      Alert.alert("form invalid");
      console.log("form invalid");
    }
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
        console.log(`login error ${e.response.data.message}`);
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);
    axios
      .get(
        `${BASE_URL}/logout`,
        {
          headers: { Authorization: `Bearer ${userInfo.accessToken}` }
        }
      )
      .then((res) => {
        console.log(res.data);
        AsyncStorage.removeItem("userInfo");
        setUserInfo({});
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`logout error ${e.response.data.message}`);
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
        headers: { Authorization: `Bearer ${userInfo.accessToken}` }
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

  const orderListUser = (Token) => {
    setListOrder({});
    setIsLoading(true);
    axios
      .get(`${ORDER_URL}/order/listOrderByUser?id_user=${userInfo.others._id}`,  {
        headers: { Authorization: `Bearer ${Token}` }
      })
      .then((res) => {
        if (res && res.data) {
          let order = res.data;
          console.log(order);
          setListOrder(order);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`update error ${e.response.data.message}`);
        setIsLoading(false);
      });
  }
  const orderListOwner = (Token) => {
    setListOrder({});
    // console.log(userInfo);
    // console.log(Token);
    setIsLoading(true);
    axios
      .get(`${ORDER_URL}/order/listOrderByOwner?id_owner=${userInfo.others._id}`,  {
        headers: { Authorization: `Bearer ${Token}` }
      })
      .then((res) => {
        if (res && res.data) {
          let order = res.data;
          // console.log(order);
          setListOrder(order);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`update error ${e.response.data.message}`);
        setIsLoading(false);
      });
  }
  const deleteOrderListOwner = (Token) => {
    setListOrder({});
    // console.log(userInfo);
    // console.log(Token);
    setIsLoading(true);
    axios
      .get(`${ORDER_URL}/order/listOrderByOwner?id_owner=${userInfo.others._id}&id_order`,  {
        headers: { Authorization: `Bearer ${Token}` }
      })
      .then((res) => {
        if (res && res.data) {
          let order = res.data;
          // console.log(order);
          setListOrder(order);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`update error ${e.response.data.message}`);
        setIsLoading(false);
      });
  }
  const OrderDetail = () => {
    // console.log(IdOrder);
    setIsLoading(true);
    axios
      .get(ORDER_URL+`/order/getAOrder?id=${IdOrder}`,{
        headers: {
           Authorization: `Bearer ${userInfo.accessToken} ` 
          }
      })
      .then((res) => {
        if (res && res.data) {          
          let Detail = res.data;
          // console.log(Detail);
          setDetailOrder(Detail);
          setCheck(true);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`update error ${e.response.data.message}`);
        setIsLoading(false);
        setCheck(false);
      });
  }
  const AddOrder = () => {
    // console.log(IdOrder);
    setIsLoading(true);
    axios
      .get(ORDER_URL+`/order/create?id=${IdOrder}`,{
        headers: {
           Authorization: `Bearer ${userInfo.accessToken} ` 
          }
      })
      .then((res) => {
        if (res && res.data) {          
          let Detail = res.data;
          // console.log(Detail);
          setDetailOrder(Detail);
          setCheck(true);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`update error ${e.response.data.message}`);
        setIsLoading(false);
        setCheck(false);
      });
  }
  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        DetailOrder,
        checkSignUp,
        ListOrder,
        formError,
        isLoading,
        userInfo,
        checkValueSignUp,
        splashLoading,
        IdOrder,
        check,
        deleteOrderListOwner,
        setCheck,
        setDetailOrder,
        setIdOrder,
        OrderDetail,
        orderListUser,
        orderListOwner,
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
