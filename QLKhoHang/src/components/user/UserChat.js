import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, TextInput, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { ORDER_URL } from "../../config";
import axios from "axios";
import AppStyle from "../../theme";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const UserChat = ({ item }) => {
  const { userInfo,setModalVisibleChat,modalVisibleChat,DeleteUserChat } = useContext(AuthContext);
  const [listChat, setListChat] = useState([]);
  const navigation = useNavigation();
  let id = item._id;
  let proFile = listChat;
  // console.log(item);
  const proFiles = async () => {
    // console.log(item.members[1]);
    if (userInfo.accessToken) {
      axios
        .get(ORDER_URL + `/chat/getProfileOwner/${item.members[1]}`)
        .then((res) => {
          if (res && res.data) {
            setListChat(res.data.Owner);
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
    proFiles();
  }, []);
  
  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ChatMessagesScreen", {
          idMessage: id,
          proFiles: proFile,
        })
      }
      onLongPress={()=>{setModalVisibleChat(true)}}
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

      <View>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          {listChat.username}
        </Text>
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
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisibleChat}
        onRequestClose={() => {
          setModalVisibleChat(!modalVisibleChat);
        }}
      >
        <View className="flex-1 w-full h-full" style={{backgroundColor:"rgba(0,0,0,0.2)"}}>
        <View className="absolute top-1/3 left-24">

          <Pressable
            className="w-full left-44"
            onPress={() => {
              setModalVisibleChat(!modalVisibleChat);
            }}
          >
            <Ionicons
              name="close-outline"
              size={35}
              color="#fff"
              style={AppStyle.StyleOderList.textStyle}
            />
          </Pressable>
          <View
          className="justify-center"
            style={{
              width: 213,
              height: 150,
              borderRadius: 10,
              backgroundColor: "#fff",
              textAlign: "center",
            }}
          >
            <View className="">
              <TouchableOpacity
                onPress={() => {
                  DeleteUserChat(item._id),setModalVisibleChat(!modalVisibleChat)
                }}
                className="w-auto h-10 bg-red-500 flex flex-row items-center m-1 rounded-md"
              >
                <MaterialIcons name="delete" size={24} color="black" />
                <Text>Xóa đoạn chat này !</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => {
                  textCommnetUpdate != "" ? UpdataItemComment() : "";
                }}
                className="w-auto h-10 bg-blue-500 flex flex-row items-center m-1 rounded-md"
              >
                <MaterialCommunityIcons name="pencil" size={24} color="black" />
                <Text>Cập nhật</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default UserChat;
