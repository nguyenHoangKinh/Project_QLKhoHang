import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import axios from "axios";
import { BASE_URL, ORDER_URL } from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [checkValueSignUp, setCheckValueSignUp] = useState(false);
  const [modalVisibleUpdateTextComment, setModalVisibleUpdateTextComment] =
    useState(false);
  const [modalVisibleComment, setModalVisibleComment] = useState(false);
  const [check, setCheck] = useState(false);
  const [checkDetail, setCheckDetail] = useState(false);
  const [checkUpdate, setCheckUpdate] = useState(false);
  const [checkSignUp, setCheckSignUp] = useState(false);
  const [checkAddOrder, setCheckAddOrder] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [formError, setFormError] = useState({});
  //order
  const [ListOrderOwner0, setListOrderOwner0] = useState({});
  const [ListOrderOwner1, setListOrderOwner1] = useState({});
  const [ListOrderOwner2, setListOrderOwner2] = useState({});
  const [ListOrderOwner3, setListOrderOwner3] = useState({});
  const [ListOrder, setListOrder] = useState({});
  const [OrderItem, setOrderItem] = useState({});
  const [DetailOrder, setDetailOrder] = useState({});
  const [list, setListWare] = useState({});
  const [listBlog, setListBlog] = useState({});
  const [detailBlog, setDetailBlog] = useState({});
  const [listCommnets, setListCommnets] = useState([]);
  const [detailBlogListCommnetsId, setDetailBlogListCommnetsId] = useState("");
  const [showImgBlog, setShowImgBlog] = useState([]);
  const [visible, setIsVisible] = useState(false);
  const [formErrorChangePass, setFormErrorChangePass] = useState("");
  const [formErrorLogin, setFormErrorLogin] = useState("");
  const [numberLike, setNumberLike] = useState(0);
  const [numberLikes, setNumberLikes] = useState(0);
  const [index, setIndex] = useState("");
  //chats
  const [modalVisibleChat, setModalVisibleChat] = useState(false);
  const [modalVisibleMessChat, setModalVisibleMessChat] = useState(false);
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const [listChat, setListChat] = useState(null);
  const [listMessages, setListMessages] = useState("");
  const [idChat, setIdChat] = useState("");

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

  const logout = async () => {
    setIsLoading(true);
    // if (userInfo.accessToken) {
    await axios
      .get(`${BASE_URL}/logout`, {
        headers: { Authorization: `Bearer ${userInfo.accessToken}` },
      })
      .then(async (res) => {
        // console.log(res.data);
        // alert(res.data.message);
        await AsyncStorage.removeItem("userInfo");
        setUserInfo({});
        setNumberLikes(0);
        setNumberLike(0);
        setFormErrorLogin("");
        setFormErrorChangePass("");
        setListCommnets([]);
        setIsVisible(false);
        setShowImgBlog([]);
        setDetailBlogListCommnetsId("");
        setDetailBlog({});
        setListBlog({});
        setListWare({});
        setDetailOrder({});
        setListOrder({});
        setCheckUpdate(false);
        setFormError({});
        setCheckSignUp(false);
        setSplashLoading(false);
        setIsLoading(false);
        setCheckDetail(false);
        setCheck(false);
        setCheckValueSignUp(false);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`logout error ${e.response.data.message}`);
        userInfo.accessToken = null;
        setIsLoading(false);
      });
    // } else {
    //   alert("lopout error access token undefined");
    // }
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
      if (e.response.data.success === false) {
        alert(e.response.data.message);
        logout();
      }
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
        if (e.response.data.success === false) {
          alert("bạn đã hết hạng đăng nhập");
          logout();
        }
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
        // console.log(`update error ${e.res}`);
        setCheckUpdate(false);
        setIsLoading(false);
        if (e.response.data.success === false) {
          alert("bạn đã hết hạng đăng nhập");
          logout();
        }
      });
  };
  const changePassword = (currentPasswords, passwords, confirmPasswords) => {
    // console.log(currentPasswords,passwords, confirmPasswords);
    setFormErrorChangePass("");
    setIsLoading(true);
    axios
      .put(
        `${BASE_URL}/change-password?id=${userInfo._id}`,
        {
          currentPassword: currentPasswords,
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
        setFormErrorChangePass("");
        setIsLoading(false);
      })
      .catch((e) => {
        // console.log(`error ${e.response.data.message}`);
        setFormErrorChangePass(e.response.data.message);
        setIsLoading(false);
      });
  };
  //Order
  const ListOrderOwnerStatus0 = () => {
    setIsLoading(true);
    if (userInfo.accessToken) {
      axios
        .get(`${ORDER_URL}/order/listOrderByOwner?status=0`, {
          headers: { Authorization: `Bearer ${userInfo.accessToken}` },
        })
        .then((res) => {
          if (res && res.data) {
            let order = res.data.data;
            setListOrderOwner0(order);
          }
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(`update error ${e.response.data.message}`);
          setIsLoading(false);
          if (e.responsxe.data.success === false) {
            alert(e.response.data.message);
            logout();
          }
        });
    } else {
      alert("error access token undefined");
    }
  };
  const ListOrderOwnerStatus1 = () => {
    setIsLoading(true);
    if (userInfo.accessToken) {
      axios
        .get(`${ORDER_URL}/order/listOrderByOwner?status=1`, {
          headers: { Authorization: `Bearer ${userInfo.accessToken}` },
        })
        .then((res) => {
          if (res && res.data) {
            let order = res.data.data;
            setListOrderOwner1(order);
          }
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(`update error ${e.response.data.message}`);
          setIsLoading(false);
          if (e.responsxe.data.success === false) {
            alert(e.response.data.message);
            logout();
          }
        });
    } else {
      alert("error access token undefined");
    }
  };
  const ListOrderOwnerStatus2 = () => {
    setIsLoading(true);
    if (userInfo.accessToken) {
      axios
        .get(`${ORDER_URL}/order/listOrderByOwner?status=2`, {
          headers: { Authorization: `Bearer ${userInfo.accessToken}` },
        })
        .then((res) => {
          if (res && res.data) {
            let order = res.data.data;
            setListOrderOwner2(order);
          }
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(`update error ${e.response.data.message}`);
          setIsLoading(false);
          if (e.responsxe.data.success === false) {
            alert(e.response.data.message);
            logout();
          }
        });
    } else {
      alert("error access token undefined");
    }
  };
  const ListOrderOwnerStatus3 = () => {
    setIsLoading(true);
    if (userInfo.accessToken) {
      axios
        .get(`${ORDER_URL}/order/listOrderByOwner?status=3`, {
          headers: { Authorization: `Bearer ${userInfo.accessToken}` },
        })
        .then((res) => {
          if (res && res.data) {
            let order = res.data.data;
            setListOrderOwner3(order);
          }
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(`update error ${e.response.data.message}`);
          setIsLoading(false);
          if (e.responsxe.data.success === false) {
            alert(e.response.data.message);
            logout();
          }
        });
    } else {
      alert("error access token undefined");
    }
  };
  const ActivateOrderOwner = (idOrder) => {
    if (idOrder) {
      axios
        .put(
          ORDER_URL + `/order/activate?id_order=${idOrder}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${userInfo.accessToken}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          ListOrderOwnerStatus0();
          ListOrderOwnerStatus1();
        })
        .catch((e) => {
          console.log(`update error ${e.response.data.message}`);
        });
    } else {
      alert("xoa that bai!");
    }
  };
  const ConfirmOrderOwner = (idOrder) => {
    if (idOrder) {
      axios
        .put(
          ORDER_URL + `/order/payment?id_order=${idOrder}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${userInfo.accessToken}`,
            },
          }
        )
        .then((res) => {
          ListOrderOwnerStatus1();
          ListOrderOwnerStatus2();
        })
        .catch((e) => {
          console.log(`update error ${e.response.data.message}`);
        });
    } else {
      alert("xoa that bai!");
    }
  };
  const OrderDetail = (id) => {
    setListOrder({});
    setIsLoading(true);
    if (id && userInfo.accessToken) {
      axios
        .get(ORDER_URL + `/order/getAOrder?id=${id}`, {
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
          // console.log(`update error ${e.response.data.message}`);
          setIsLoading(false);
          setCheckDetail(false);
          if (e.response.data.success === false) {
            alert("bạn đã hết hạng đăng nhập");
            logout();
          }
        });
    } else {
      alert("Error id order undefined");
    }
  };
  const SearchOrder = (Name) => {
    console.log(Name);
    // setListOrder({});
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
          console.log(Detail);
          setListOrder(Detail);
          setCheck(true);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        // console.log(`update error ${e.response.data.message}`);
        setIsLoading(false);
        setCheck(false);
        if (e.response.data.success === false) {
          alert("bạn đã hết hạng đăng nhập");
          logout();
        }
      });
  };
  //Blog
  const ListBlog = () => {
    if (userInfo.accessToken) {
      axios
        .get(ORDER_URL + `/blog/list-by-blog`, {
          headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
          },
        })
        .then((res) => {
          // alert(res.data.message);
          // console.log(res.data.blog);
          setListBlog(res.data.blog);
        })
        .catch((e) => {
          if (e.response.data.success === false) {
            alert("bạn đã hết hạng đăng nhập");
            logout();
          }
        });
    } else {
      alert("load bai viet that bai!");
    }
  };

  const DetailBlog = () => {
    if (userInfo.accessToken && detailBlogListCommnetsId) {
      axios
        .get(ORDER_URL + `/blog/get-by-id?id=${detailBlogListCommnetsId}`, {
          headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
          },
        })
        .then((res) => {
          if (res && res.data.data) {
            setDetailBlog(res.data.data);
            if (res.data.data.images) {
              setShowImgBlog([{ uri: res.data.data.images[0] }]);
            } else {
              setShowImgBlog();
            }

            if (res.data.data.comments != "") {
              for (let i = 0; i < res.data.data.comments.length; i++) {
                setIndex(i + 1);
              }
            } else {
              setIndex(0);
            }
            if (res.data.data.likes != "") {
              for (let i = 0; i < res.data.data.likes.length; i++) {
                setNumberLikes(i + 1);
                if (res.data.data.likes[i] == userInfo.others._id) {
                  setNumberLike(1);
                }
              }
            } else {
              setNumberLikes(0);
              setNumberLike(0);
            }
          }
        })
        .catch((e) => {
          if (e.response.data.success === false) {
            alert("bạn đã hết hạng đăng nhập");
            logout();
          }
        });
    } else {
      alert("load bai viet that bai!");
    }
  };
  const ListComments = () => {
    if (userInfo.accessToken && detailBlogListCommnetsId) {
      axios
        .get(
          ORDER_URL +
            `/blog/comment/list-by-blog?idBlog=${detailBlogListCommnetsId}`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.accessToken}`,
            },
          }
        )
        .then((res) => {
          if (res && res.data.data) {
            setListCommnets(res.data.data);
          }
        })
        .catch((e) => {
          alert(e.response.data.message);
        });
    } else {
      alert("load binh luan that bai!");
    }
  };
  const pustComments = (contents) => {
    if (userInfo.accessToken && detailBlogListCommnetsId) {
      axios
        .post(
          ORDER_URL + `/blog/comment/create?idBlog=${detailBlogListCommnetsId}`,
          {
            content: contents,
          },
          {
            headers: { Authorization: `Bearer ${userInfo.accessToken}` },
          }
        )
        .then((res) => {
          if (res && res.data.data) {
            // console.log(res.data);
            ListComments();
            DetailBlog();
          }
        })
        .catch((e) => {
          alert(e.response.data.data.message);
        });
    } else {
      alert("load binh luan that bai!");
    }
  };
  const DeleteTextCommentUser = (id) => {
    // console.log(id);
    if (userInfo.accessToken && id) {
      axios
        .delete(ORDER_URL + `/blog/comment/delete?idComment=${id}`, {
          headers: { Authorization: `Bearer ${userInfo.accessToken}` },
        })
        .then((res) => {
          if (res && res.data) {
            ListComments();
            DetailBlog();
          }
        })
        .catch((e) => {
          alert("bình luận này không phải của bạn nên bạn ko thể xóa!");
          console.log(e.response.data.message);
        });
    } else {
      alert("Xoa binh luan that bai!");
    }
  };
  const UpdataTextCommentUser = (contens, id) => {
    // console.log(contens,id);
    if (userInfo.accessToken && id) {
      axios
        .put(
          ORDER_URL + `/blog/comment/update?idComment=${id}`,
          {
            content: contens,
          },
          {
            headers: { Authorization: `Bearer ${userInfo.accessToken}` },
          }
        )
        .then((res) => {
          if (res && res.data) {
            alert(res.data.message);
            setModalVisibleUpdateTextComment(false);
            // setModalVisibleComment(false);
            ListComments();
            DetailBlog();
          }
        })
        .catch((e) => {
          alert("bình luận này không phải của bạn nên bạn ko thể sửa!");
          console.log(e.response.data.message);
        });
    } else {
      alert("load binh luan that bai!");
    }
  };
  const LikeBlog = () => {
    if (userInfo.accessToken && detailBlogListCommnetsId) {
      axios
        .put(
          ORDER_URL + `/blog/likes/${detailBlogListCommnetsId}`,
          {},
          {
            headers: { Authorization: `Bearer ${userInfo.accessToken}` },
          }
        )
        .then((res) => {
          if (res && res.data) {
            // console.log(res.data.blog);
            if (res.data.blog.likes != "") {
              for (let i = 0; i < res.data.blog.likes.length; i++) {
                setNumberLikes(i + 1);
                if (res.data.blog.likes[i] == userInfo.others._id) {
                  setNumberLike(1);
                } else {
                  setNumberLike(0);
                }
              }
            } else if (res.data.blog.likes == "") {
              setNumberLikes(0);
              setNumberLike(0);
            }
            DetailBlog();
          }
        })
        .catch((e) => {
          console.log(e.response.data.message);
        });
    } else {
      alert("load binh luan that bai!");
    }
  };
  const DisLike = (id) => {
    // console.log(id);
    if (userInfo.accessToken && id) {
      axios
        .put(
          ORDER_URL + `/blog/dislikes/${id}`,
          {},
          {
            headers: { Authorization: `Bearer ${userInfo.accessToken}` },
          }
        )
        .then((res) => {
          if (res && res.data) {
            // alert(res.data);
            setNumberLike(0);
            // console.log(res.data.blog.likes);
            // if (res.data.blog.likes == "") {
            //   setNumberLikes(0)
            // }else if (res.data.blog.likes) {
            //   for (let i = 0; i < res.data.blog.likes.length; i++) {
            //     console.log("helloasdasd", i);
            //     setNumberLikes(i + 1);

            //   }
            // }
            DetailBlog();
          }
        })
        .catch((e) => {
          console.log(e.response.data.message);
        });
    } else {
      alert(">>>>>>>>>>>>>load binh luan that bai!");
    }
  };
  const AddChats = (secondIds) => {
    // console.log(secondIds, userInfo.others._id);
    let number = false;
    if (userInfo.accessToken && userInfo.others._id) {
      // console.log(id);
      axios
        .get(ORDER_URL + `/chat/listChat`, {
          headers: { Authorization: `Bearer ${userInfo.accessToken}` },
        })
        .then((res) => {
          // console.log(res.data);
          if (res && res.data) {
            checkProfile(secondIds, res.data.chat);
          }
        })
        .catch((e) => {
          console.log(e.response.data);
        });
    } else {
      console.log("load user chat that bai!");
    }
  };
  const checkProfile = (id, item) => {
    // let idchatitem = null;
    item.some((item, index) => {
      if (item.members[1] === id && item.members[0] === userInfo.others._id) {
        // console.log(">>>>>>",item._id);
        setIdChat(item._id);
        return (number = true);
      }
      return (number = false);
    });
    if (number == false) {
      axios
        .post(
          ORDER_URL + `/chat/createChat/`,
          {
            firstId: userInfo.others._id,
            secondId: id,
          },
          {
            headers: {
              Authorization: `Bearer ${userInfo.accessToken}`,
            },
          }
        )
        .then((res) => {
          if (res && res.data) {
            setIdChat(res.data.chat._id);
          }
        })
        .catch((e) => {
          console.log(e.response.data);
        });
    }
  };
  const ListChats = () => {
    if (userInfo.accessToken && userInfo.others._id) {
      axios
        .get(ORDER_URL + `/chat/listChat`, {
          headers: { Authorization: `Bearer ${userInfo.accessToken}` },
        })
        .then((res) => {
          if (res && res.data) {
            setListChat(res.data.chat);
          }
        })
        .catch((e) => {
          console.log(e.response.data);
        });
    } else {
      console.log("load user chat that bai!");
    }
  };
  const ListMessage = (id) => {
    // console.log(id);
    if (userInfo.accessToken && id) {
      axios
        .get(ORDER_URL + `/message/findMessage/${id}`, {
          headers: { Authorization: `Bearer ${userInfo.accessToken}` },
        })
        .then((res) => {
          // console.log(res.data);
          if (res && res.data) {
            // console.log(res.data);
            setListMessages(res.data.message);
          }
        })
        .catch((e) => {
          console.log(e.response.data);
        });
    } else {
      console.log("load user chat that bai!");
    }
  };
  const DeleteUserChat = (id) => {
    console.log(id);
    if (userInfo.accessToken && id) {
      axios
        .delete(ORDER_URL + `/chat/deleteChat/${id}`, {
          headers: { Authorization: `Bearer ${userInfo.accessToken}` },
        })
        .then((res) => {
          if (res && res.data) {
            ListChats();
            setModalVisibleChat(!modalVisibleChat);
          }
        })
        .catch((e) => {
          console.log(e.response.data.message);
        });
    } else {
      alert("Xoa userChat that bai!");
    }
  };
  const DeleteUserMessChat = (idMess, id) => {
    // console.log(id);
    if (userInfo.accessToken && id) {
      axios
        .delete(ORDER_URL + `/message/deleteMessage/${id}`, {
          headers: { Authorization: `Bearer ${userInfo.accessToken}` },
        })
        .then((res) => {
          if (res && res.data) {
            console.log(res.data);
            setModalVisibleMessChat(!modalVisibleMessChat);
            ListMessage(idMess);
            // ListChats()
            // setModalVisibleChat(!modalVisibleChat)
          }
        })
        .catch((e) => {
          console.log(e.response.data.message);
        });
    } else {
      alert("Xoa userChat luan that bai!");
    }
  };
  const PostMessage = (idMessages) => {
    // console.log(idMessages);
    let idMess = idMessages[0];
    if (
      userInfo.accessToken &&
      idMessages[0] &&
      idMessages[1] &&
      idMessages[2]
    ) {
      axios
        .post(
          ORDER_URL + `/message/createMessage/`,
          {
            chatId: idMessages[0],
            senderId: idMessages[1],
            text: idMessages[2],
          },
          {
            headers: { Authorization: `Bearer ${userInfo.accessToken}` },
          }
        )
        .then((res) => {
          if (res && res.data) {
            ListMessage(idMess);
          }
        })
        .catch((e) => {
          console.log(e.response.data);
        });
    } else {
      console.log("load pust chat that bai!");
    }
  };
  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        modalVisibleUpdateTextComment,
        detailBlogListCommnetsId,
        modalVisibleMessChat,
        formErrorChangePass,
        modalVisibleComment,
        modalVisibleChat,
        checkValueSignUp,
        formErrorLogin,
        splashLoading,
        acceptedFriends,
        listMessages,
        checkUpdate,
        DetailOrder,
        checkSignUp,
        listCommnets,
        ListOrder,
        ListOrderOwner0,
        ListOrderOwner1,
        ListOrderOwner2,
        ListOrderOwner3,
        idChat,
        numberLikes,
        checkDetail,
        showImgBlog,
        numberLike,
        detailBlog,
        formError,
        OrderItem,
        isLoading,
        visible,
        index,
        listBlog,
        userInfo,
        listChat,
        check,
        list,
        login,
        signUP,
        logout,
        setCheck,
        setIndex,
        setCheck,
        DisLike,
        ListBlog,
        LikeBlog,
        ListChats,
        setIdChat,
        AddChats,
        ListMessage,
        PostMessage,
        setIsVisible,
        setNumberLikes,
        setNumberLike,
        setListMessages,
        setIsLoading,
        getProfile,
        DetailBlog,
        ListComments,
        setListWare,
        SearchOrder,
        OrderDetail,
        pustComments,
        DeleteUserChat,
        DeleteUserMessChat,
        setListCommnets,
        setShowImgBlog,
        updateProfile,
        setDetailOrder,
        changePassword,
        setCheckDetail,
        ListOrderOwnerStatus0,
        ListOrderOwnerStatus1,
        ListOrderOwnerStatus2,
        ListOrderOwnerStatus3,
        ActivateOrderOwner,
        ConfirmOrderOwner,
        setModalVisibleChat,
        setModalVisibleMessChat,
        UpdataTextCommentUser,
        DeleteTextCommentUser,
        setModalVisibleComment,
        setFormErrorChangePass,
        setDetailBlogListCommnetsId,
        setModalVisibleUpdateTextComment,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
