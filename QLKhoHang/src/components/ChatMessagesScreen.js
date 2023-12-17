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
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, {
  useState,
  useContext,
  useLayoutEffect,
  useEffect,
  useRef,
} from "react";
// import EmojiSelector from "react-native-emoji-selector";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../context/AuthContext";
import AppStyle from "../theme";
import {
  Entypo,
  MaterialIcons,
  Feather,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import  io  from "socket.io-client";

const ChatMessagesScreen = () => {
  const socket = io('https://warehouse-management-api.vercel.app');
  socket.on('connection', () => {
    console.log('Connected to server');
  });
  const {
    userInfo,
    ListMessage,
    listMessages,
    PostMessage,
    setIdChat,
    idChat,
    setListMessages,
    DeleteUserMessChat,
    modalVisibleMessChat,
    setModalVisibleMessChat,
  } = useContext(AuthContext);
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [recepientData, setRecepientData] = useState();
  const navigation = useNavigation();
  const [idMess, setIdMess] = useState("");
  const route = useRoute();
  const { idMessage, proFiles } = route.params;
  const [message, setMessage] = useState("");

  // console.log(idChat);
  console.log(">>>>>>>>>idMess>>>>>>>>>",listMessages);
  // const { userId, setUserId } = useContext(UserType);

  // const scrollViewRef = useRef(null);

  useEffect(() => {
    if (idChat == "") {
      ListMessage(idMessage);
    } else {
      ListMessage(idChat);
    }
  }, []);

  const handleSend = async () => {
    const messages = [
      idMessage != "" ? idMessage : idChat,
      userInfo.others._id,
      message,
    ];
    PostMessage({...messages});
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
            onPress={() => {
              navigation.goBack(), setIdChat(""), setListMessages("");
            }}
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
      ),
    });
  }, []);
  const FlatListDataChat = (item, index) => {
    // console.log(item);
    // if (item.members[0] === userInfo.others._id) {
    return (
      <TouchableOpacity
        onLongPress={() => {proFiles._id !== item.senderId ?
          (setModalVisibleMessChat(true),setIdMess(item._id)): ""
        }}
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
      </TouchableOpacity>
    );
    // }
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
      <View className="flex" style={{ height: "88%" }}>
        <FlatList
          data={listMessages}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => FlatListDataChat(item, index)}
        />
      </View>
      <View
      className="mb-10"
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: "#dddddd",
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
          onPress={() => {message != "" ? handleSend() :""}}
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
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisibleMessChat}
        onRequestClose={() => {
          setModalVisibleMessChat(!modalVisibleMessChat);
        }}
      >
        <View
          className="flex-1 w-full h-full"
          style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
        >
          <View className="absolute top-1/3 left-24">
            <Pressable
              className="w-full left-44"
              onPress={() => {
                setModalVisibleMessChat(!modalVisibleMessChat);
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
                    Alert.alert(
                      "",
                      "Bạn muốn xóa tin nhắn này ?",
                      [
                        {
                          text: "Cancel",
                          style: "cancel",
                        },
                        { text: "OK", onPress: () => {DeleteUserMessChat(idMessage != "" ? idMessage :idChat,idMess),setIdMess("")} },
                      ],
                      { cancelable: false }
                    );
                    
                  }}
                  className="w-auto h-10 bg-red-500 flex flex-row items-center m-1 rounded-md"
                >
                  <MaterialIcons name="delete" size={24} color="black" />
                  <Text>Xóa tin nhắn!</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};
export default ChatMessagesScreen;
