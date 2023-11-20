import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { BASE_URL, ORDER_URL } from "../config";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [checkValueSignUp, setCheckValueSignUp] = useState(false);
  const [check, setCheck] = useState(false);
  const [checkDetail, setCheckDetail] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [warehouse, setWarehouse] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [checkSignUp, setCheckSignUp] = useState(false);
  const [formError, setFormError] = useState({});
  const [checkUpdate, setCheckUpdate] = useState(false);
  const [ListOrder, setListOrder] = useState({});
  const [IdOrder, setIdOrder] = useState({});
  const [DetailOrder, setDetailOrder] = useState({});
  const [list, setListWare] = useState([]);
  const [listBlog, setListBlog] = useState([]);
  const [formErrorChangePass, setFormErrorChangePass] = useState("");
  const [formErrorLogin, setFormErrorLogin] = useState("");
  // console.log(userInfo);
  // console.log(userInfo);
  const signUP = (
    usernames,
    passwords,
    confirmPasswords,
    addresses,
    phones,
    emails
    // checkValue,
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
      // let check ='';
      // if (checkValue) {
      //   check= '1';
      // }else
      // {
      //   check='0'
      // }
      axios
        .post(`${BASE_URL}/register?status=1`, acc)
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
    } else {
      setCheckSignUp(false);
      Alert.alert(e.response.data.message);
      console.log("form invalid");
    }
  };

  const login = (username, password) => {
    setFormErrorLogin("");
    setIsLoading(true);
    if (username && password) {
      axios
        .post(`${BASE_URL}/login`, {
          username,
          password,
        })

        .then((res) => {
          let userInfo = res.data;
          setUserInfo(userInfo);
          AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
          setCheck(true);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(`login error ${e.response.data.message}`);
          setCheck(false);
          setFormErrorLogin(e.response.data.message);
          setIsLoading(false);
        });
    } else {
      alert("bang chua nhap username or password");
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log(userInfo.accessToken);  
    setIsLoading(true);
    if (userInfo.accessToken) {
      axios
        .get(`${BASE_URL}/logout`, {
          headers: { Authorization: `Bearer ${userInfo.accessToken}` },
        })
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
          AsyncStorage.removeItem("userInfo");
          setUserInfo({});
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(`logout error ${e.response.data.message}`);
          userInfo.accessToken = null;
          setIsLoading(false);
        });
    } else {
      alert("lopout error access token undefined");
    }
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

  const getProfile = () => {
    axios
      .get(`${BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      })
      .then((res) => {
        let address = res.data.others.address;
        let phone = res.data.others.phone;
        let email = res.data.others.email;
        userInfo.others.address = address;
        userInfo.others.phone = phone;
        userInfo.others.email = email;
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      })
      .catch((e) => {
        console.log(`get error ${e.res}`);
      });
  };

  const updateProfile = (address, phone, email) => {
    setIsLoading(true);
    axios
      .put(
        `${BASE_URL}/update-account`,
        {
          address: address,
          email: email,
          phone: phone,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.accessToken}` },
        }
      )
      .then((res) => {
        // console.log(res.data);
        getProfile();
        setCheckUpdate(true);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`update error ${e.res}`);
        setCheckUpdate(false);
        setIsLoading(false);
      });
  };
  const changePassword = (passwords, confirmPasswords) => {
    setFormErrorChangePass("");
    setIsLoading(true);
    axios
      .put(
        `${BASE_URL}/change-password?id=${userInfo._id}`,
        {
          password: passwords,
          confirmPassword: confirmPasswords,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
          },
        }
      )
      .then((res) => {
        let password = res.data;
        // console.log(password);
        alert(password.message);
        setCheck(true);
        setFormErrorChangePass("");
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`error ${e.response.data.message}`);
        setFormErrorChangePass(e.response.data.message);
        setCheck(false);
        setIsLoading(false);
      });
  };

  const orderListUser = (Token) => {
    setListOrder({});
    setIsLoading(true);
    if (IdOrder && userInfo.accessToken) {
      axios
        .get(
          `${ORDER_URL}/order/listOrderByUser?id_user=${userInfo.others._id}`,
          {
            headers: { Authorization: `Bearer ${Token}` },
          }
        )
        .then((res) => {
          if (res && res.data) {
            let order = res.data;
            setListOrder(order);
          }
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(`update error ${e.response.data.message}`);
          setIsLoading(false);
        });
    } else {
      alert("error access token undefined");
    }
  };
  const orderListOwner = (Token) => {
    setIsLoading(true);
    if (Token) {
      setListOrder({});
      // console.log(userInfo.others._id);
      // console.log(Token);
      axios
        .get(
          `${ORDER_URL}/order/listOrderByOwner?id_owner=${userInfo.others._id}`,
          {
            headers: { Authorization: `Bearer ${Token}` },
          }
        )
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
    } else {
      alert("error access token undefined");
    }
  };
  const OrderDetail = () => {
    // console.log(IdOrder);
    setIsLoading(true);
    if (IdOrder && userInfo.accessToken) {
      axios
        .get(ORDER_URL + `/order/getAOrder?id=${IdOrder}`, {
          headers: {
            Authorization: `Bearer ${userInfo.accessToken} `,
          },
        })
        .then((res) => {
          if (res && res.data) {
            let Detail = res.data;
            // console.log(Detail);
            setDetailOrder(Detail);
            setCheckDetail(true);
          }
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(`update error ${e.response.data.message}`);
          setIsLoading(false);
          setCheckDetail(false);
        });
    } else {
      alert("Error id order undefined");
    }
  };
  const SearchOrder = (Name) => {
    setListOrder({});
    setIsLoading(true);
    axios
      .get(ORDER_URL + `/order/searchOrder?name=${Name}`, {
        headers: {
          Authorization: `Bearer ${userInfo.accessToken} `,
        },
      })
      .then((res) => {
        if (res && res.data) {
          let Detail = res.data.Order;
          setListOrder(Detail);
          setCheck(true);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`update error ${e.response.data.message}`);
        setIsLoading(false);
        setCheck(false);
      });
  };
  const DeleteOrderUser = (idUser,idOrder) => {
    console.log(idUser,idOrder);
    if (idUser && idOrder) {
      axios.delete(ORDER_URL+`/order/deleteOrderByUser?id_user=${idUser}&id_order=${idOrder}`,{
        headers:{
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      }).then((res)=>{
        // alert(res.data);
        // console.log(res.data);
        orderListUser(userInfo.accessToken);
      }).catch((e)=>{
        alert(e.response.data.message);
      })
    }else{
      alert("xoa that bai!");
    }
  }
  const DeleteOrderOwner = (idOwner,idOrder) => {
    if (idOwner && idOrder) {
      axios.delete(ORDER_URL+`/order/deleteOrderByOwner?id_owner=${idOwner}&id_order=${idOrder}`,{
        headers:{
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      }).then((res)=>{
        // alert(res.data.message);
        orderListOwner(userInfo.accessToken);
      }).catch((e)=>{
        alert(e.response.data.message);
      })
    }else{
      alert("xoa that bai!");
    }
  }
  const ListBlog = () => {
    if (userInfo.accessToken) {
      axios.get(ORDER_URL+`/blog/list-by-blog`,{
        headers:{
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      }).then((res)=>{
        // alert(res.data.message);
        // console.log(res.data.blog);
        setListBlog(res.data.blog);
      }).catch((e)=>{
        alert(e.response.data.message);
      })
    }else{
      alert("load bai viet that bai!");
    }
  }
  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        formErrorChangePass,
        checkValueSignUp,
        formErrorLogin,
        splashLoading,
        checkUpdate,
        DetailOrder,
        checkSignUp,
        ListOrder,
        checkDetail,
        formError,
        isLoading,
        warehouse,
        listBlog,
        userInfo,
        IdOrder,
        check,
        list,
        login,
        signUP,
        logout,
        setCheck,
        setCheck,
        ListBlog,
        getProfile,
        setIdOrder,
        setListWare,
        SearchOrder,
        OrderDetail,
        orderListUser,
        updateProfile,
        setDetailOrder,
        orderListOwner,
        changePassword,
        setCheckDetail,
        DeleteOrderUser,
        DeleteOrderOwner,
        setFormErrorChangePass,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
