import { StyleSheet, Text, View ,ScrollView, Pressable, FlatList} from "react-native";
import React, { useContext,useEffect,useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import UserChat from "./OwnerChat";


const ListChatsOwnerScreen = () => {
  const {
    ListChats,
    listChat,
    userInfo
  } = useContext(AuthContext);
  const navigation = useNavigation();
  useEffect(() => {
    ListChats()
  }, []);
  const FlatListDataChat =(item,index)=>{
    
    if (item.members[1] === userInfo.others._id) {      
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

export default ListChatsOwnerScreen;
