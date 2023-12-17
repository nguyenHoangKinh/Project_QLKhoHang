import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import UserChat from "./UserChat";

const ListChatsUserScreen = () => {
  const { ListChats, listChat,userInfo } = useContext(AuthContext);
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const navigation = useNavigation();
  // console.log(">>>ListChatUser>>>>",listChat);
  useEffect(() => {
    ListChats();
  }, []);
  // console.log(userInfo.others._id)
  const FlatListDataChat =(item,index)=>{
    
    // console.log(item.members[0]);
    if (item.members[0] === userInfo.others._id) {      
      return(
        <UserChat key={index} item={item}/>
      );
    }
  }
  return (
    <View className="flex mt-10">
        <FlatList
          data={listChat}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => FlatListDataChat(item,index)}
        />
    </View>
  );
};

export default ListChatsUserScreen;
