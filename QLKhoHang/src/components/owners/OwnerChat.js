import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { ORDER_URL } from "../../config";
import axios from "axios";

const OwnerChat = ({ item }) => {
  const {
    userInfo,
  } = useContext(AuthContext);
  const [listChat, setListChat] = useState([]);
  const navigation = useNavigation();
  let id = item._id;
  let proFile = listChat;
  // console.log(item.members);
  const fetchMessages = async () => {
    if (userInfo.accessToken) {
      axios
        .get(ORDER_URL + `/chat/getProfileUser/${item.members[0]}`)
        .then((res) => {
          // console.log(res.data);
          if (res && res.data) {
            // console.log(res.data.Owner);
            setListChat(res.data.User)
          }
        })
        .catch((e) => {
          console.log(e.response.data);
        });
    } else {
      console.log("load user chat that bai!");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);
  // console.log(messages);

  // const getLastMessage = () => {
  //   const userMessages = messages.filter(
  //     (message) => message.messageType === "text"
  //   );

  //   const n = userMessages.length;

  //   return userMessages[n - 1];
  // };
  // const lastMessage = getLastMessage();
  // console.log(lastMessage);
  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };
  return (
    <TouchableOpacity
    onPress={() =>
      navigation.navigate("ChatMessagesScreen",{idMessage:id,proFiles:proFile})
    }
    style={{
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      borderWidth: 0.7,
      borderColor: "#D0D0D0",
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      padding: 10,
    }}
  >
    <Image
      style={{ width: 50, height: 50, borderRadius: 25, resizeMode: "cover" }}
      source={{ uri: listChat.avatar }}
    />

    <View >
      <Text style={{ fontSize: 15, fontWeight: "500" }}>{listChat.username}</Text>
      {/* {lastMessage && (
        <Text style={{ marginTop: 3, color: "gray", fontWeight: "500" }}>
          {lastMessage?.message}
        </Text>
      )} */}
    </View>

    <View>
      {/* <Text style={{ fontSize: 11, fontWeight: "400", color: "#585858" }}>
        {lastMessage && formatTime(lastMessage?.timeStamp)}
      </Text> */}
    </View>
  </TouchableOpacity>
  );
};

export default OwnerChat;

