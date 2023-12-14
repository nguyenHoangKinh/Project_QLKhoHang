import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import React, {
  useState,
  useContext,
  useLayoutEffect,
  useEffect,
  useRef,
} from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
// import EmojiSelector from "react-native-emoji-selector";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../context/AuthContext";

const ChatMessagesScreen = () => {
  const { userInfo, ListMessage, listMessages, PostMessage,setIdChat,idChat,setListMessages } =
    useContext(AuthContext);
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [recepientData, setRecepientData] = useState();
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState("");
  const route = useRoute();
  const { idMessage, proFiles } = route.params;
  const [message, setMessage] = useState("");
  // console.log(idChat);
  // console.log(">>>>>>>>>idMess>>>>>>>>>",idMessage);
  // const { userId, setUserId } = useContext(UserType);

  // const scrollViewRef = useRef(null);

  useEffect(() => {
    if (idChat == "") {
      ListMessage(idMessage);
    }else{
      ListMessage(idChat);
    }
  }, []);

  const handleSend = async () => {
    PostMessage(idMessage, userInfo.others._id, message);
    setMessage("");
  };
  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };
  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      handleSend("image", result.uri);
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons
            onPress={() => {navigation.goBack(),setIdChat(""),setListMessages("")}}
            name="arrow-back"
            size={28}
            color="blue"
          />

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  resizeMode: "cover",
                }}
                source={{ uri: proFiles?.avatar }}
              />

              <Text style={{ marginLeft: 5, fontSize: 15, fontWeight: "bold" }}>
                {proFiles?.username}
              </Text>
            </View>
        </View>
      )
    });
  }, []);
  const FlatListDataChat = (item, index) => {
    console.log(item.text);
    // if (item.members[0] === userInfo.others._id) {
    return (
      <View
        className="w-auto mt-6 ml-3.5"
        style={[
          item.senderId === userInfo.others._id
            ? {
                alignSelf: "flex-end",
                maxWidth: "60%",
                borderRadius: 7,
                margin: 10,
              }
            : {
                alignSelf: "flex-start",
                backgroundColor: "white",
                margin: 10,
                borderRadius: 7,
                maxWidth: "60%",
              },
        ]}
      >
        <View className=" bg-slate-200  rounded-lg text-right p-2">
          {item.senderId === userInfo.others._id ? (
            ""
          ) : (
            <View
              className="flex-row absolute w-8 h-8"
              style={{ top: -20, left: -12 }}
            >
              <Image
                className="w-full h-full rounded-full"
                source={{
                  uri: `${proFiles.avatar}`,
                }}
              />
            </View>
          )}
          <Text className="">{item.text}</Text>
          <Text
            style={{
              fontSize: 9,
              color: "gray",
              marginTop: 5,
            }}
          >
            {formatTime(item.createdAt)}
          </Text>
        </View>
      </View>
    );
    // }
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
      <View className="flex" style={{ height: "90%" }}>
        <FlatList
          data={listMessages}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => FlatListDataChat(item, index)}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: "#dddddd",
          marginBottom: showEmojiSelector ? 0 : 25,
        }}
      >
        {/* <Entypo
          onPress={handleEmojiPress}
          style={{ marginRight: 5 }}
          name="emoji-happy"
          size={24}
          color="gray"
        /> */}
        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: "#dddddd",
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
          placeholder="Type Your message..."
        />

        <Pressable
          onPress={() => handleSend()}
          style={{
            backgroundColor: "#007bff",
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 20,
            marginLeft: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};
export default ChatMessagesScreen;
