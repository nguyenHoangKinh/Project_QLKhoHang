import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  TextInput,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState, useContext, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import AppStyle from "../theme";
import { AuthContext } from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import ImageView from "react-native-image-viewing";
import BottomSheet from "react-native-simple-bottom-sheet";
export default function DetaiBlogPost({ route, navigation }) {
  const {
    DetailBlog,
    detailBlog,
    showImgBlog,
    modalVisible,
    setShowImgBlog,
    setModalVisible,
    visible,
    userInfo,
    LikeBlog,
    DisLike,
    setIndex,
    index,
    setIsVisible,
    ListComments,
    listCommnets,
    setListCommnets,
    pustComments,
    numberLike,
    setNumberLike,
    setNumberLikes,
    numberLikes,
    UpdataTextCommentUser,
    detailBlogListCommnetsId,
    DeleteTextCommentUser,
    modalVisibleUpdateTextComment,
    setModalVisibleUpdateTextComment,
  } = useContext(AuthContext);
  const [imageView, setImageView] = useState("");

  const [idComment, setIdComment] = useState("");
  const [message, setMessage] = useState("");
  const [textCommnetUpdate, setTextCommnetUpdate] = useState("");
  const [messagedate, setMessagedate] = useState("");
  const [checkImageViewValue, setcheckImageViewValue] = useState([]);
  // const { itemId } = route.params;
  const panelRef = useRef(null);
  // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", idComment);

  useEffect(() => {
    DetailBlog();
    ListComments();
  }, []);
  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };
  const pustTextComment = () => {
    pustComments(message, detailBlogListCommnetsId);
    setMessage("");
  };
  const checkModel= (item)=> {
    console.log(item);
    if (item === userInfo.others._id) {
      setModalVisible(true)
    }else{
      alert("bạn không thể chỉnh sửa bình luận của người khác!")
    }
  }
  const DeleteItemComment = () => {
      Alert.alert(
        "",
        "Bạn có chất là muốn xóa bình luận này?",
        [
          {
            text: "Cancel",
            onPress: () => {
              navigation.navigate("DetaiBlogPost"), setIdComment("");
            },
            style: "cancel",
          },
          { text: "OK", onPress: () => DeleteTextCommentUser(idComment) },
        ],
        { cancelable: false }
      );
  };
  const UpdataItemComment = () => {
    if (textCommnetUpdate == "") {
      alert("bạn chưa nhập văn bản !");
    } else {
      Alert.alert(
        "",
        "bạn có chất là muốn sửa bình luận này?",
        [
          {
            text: "Cancel",
            onPress: () => {
              navigation.navigate("DetaiBlogPost"), setIdComment("");
            },
            style: "cancel",
          },
          { text: "OK", onPress: () => UpdataTextCommentUser(textCommnetUpdate,idComment) },
        ],
        { cancelable: false }
      );
    }
  };
  const FlatListData = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setcheckImageViewValue([{ uri: item }]), setImageView(item);
        }}
        className="w-28 h-28 m-0.5"
      >
        <Image
          source={{
            uri: `${item}`,
          }}
          className="w-full h-full"
        />
      </TouchableOpacity>
    );
  };
  const FlatListComment = (item, index) => {
    setIndex(index + 1);
    return (
      <TouchableOpacity
        onLongPress={() => {
          checkModel(item.account), setIdComment(item._id);
        }}
      >
        <View className="flex flex-col w-36 h-auto bg-slate-200 m-2 rounded-lg text-left p-2">
          <Text className="">{item.content}</Text>
          <Text
            style={{
              textAlign: "right",
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
  };
  return (
    <>
      <ScrollView
        className="flex-1 bg-white "
        style={{ backgroundColor: themeColors.bg }}
      >
        <SafeAreaView className="flex h-120">
          <View className="flex-row justify-start top-5">
            <TouchableOpacity
              onPress={() => {
                {
                  navigation.goBack(),
                    setIdComment(""),
                    setIndex(""),
                    setNumberLike(0),
                    setNumberLikes(0),
                    setImageView(""),
                    setListCommnets([]);
                  setcheckImageViewValue([]), setShowImgBlog([]);
                }
              }}
              className="bg-blue-300 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            >
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-2xl text-center font-semibold left-20">
              Thông Tin Kho
            </Text>
          </View>
          <View
            className="flex-row justify-center mt-3 mb-3"
            style={{ width: 390, height: 70 }}
          ></View>
        </SafeAreaView>
        <View className="flex-1 bg-white px-5 pt-6 pb-16 rounded-2xl">
          {showImgBlog == "" ? (
            ""
          ) : (
            <View className=" w-full top-12  border-solid border-2 border-sky-500 pb-1">
              <View className="w-full h-96">
                <TouchableOpacity
                  onPress={() => setIsVisible(true)}
                  className="p-1 w-full "
                  style={{ height: 270 }}
                >
                  <Image
                    className="w-full h-full "
                    source={{
                      uri:
                        imageView == "" ? `${showImgBlog[0].uri}` : imageView,
                    }}
                  />
                </TouchableOpacity>
                <View className="flex-row ">
                  <FlatList
                    data={detailBlog.images}
                    horizontal
                    // keyExtractor={(item) => String(item)}
                    renderItem={({ item, index }) => FlatListData(item, index)}
                  />
                </View>
              </View>
            </View>
          )}
          {showImgBlog == "" ? (
            ""
          ) : (
            <ImageView
              images={
                checkImageViewValue == "" ? showImgBlog : checkImageViewValue
              }
              imageIndex={0}
              visible={visible}
              onRequestClose={() => setIsVisible(false)}
            />
          )}
          <View className="border-2 border-blue-400 mt-16">
            <Text className="text-gray-700 ml-2 w-55 text-lg">
              {detailBlog.description}
            </Text>
          </View>
          <View className="border-2 border-blue-400 mt-1">
            <Text className="text-gray-700 ml-2 w-55 text-lg">
              Thông tin kho
            </Text>
            <View className=" justify-between pt-2 pb-5">
              <Text className="text-gray-700 ml-2 w-55 ">
                Mã kho:{" "}
                {detailBlog.warehouse == null
                  ? ""
                  : detailBlog.warehouse.wareHouseName}
              </Text>
              <Text className="text-gray-700 ml-2 w-55 ">
                Diện tích:{" "}
                {detailBlog.warehouse == null
                  ? ""
                  : detailBlog.warehouse.capacity}
              </Text>
              <Text className="text-gray-700 ml-2 w-55 ">
                Giá thuê:{" "}
                {detailBlog.warehouse == null
                  ? ""
                  : detailBlog.warehouse.monney}
              </Text>
            </View>
            <Text className="text-gray-700 ml-2 w-55 text-lg">
              Thông tin chủ kho
            </Text>
            <View className=" justify-between pt-2 pb-5">
              <Text className="text-gray-700 ml-2 w-55 ">
                Tên chủ kho:{" "}
                {detailBlog.owner == null ? "" : detailBlog.owner.username}
              </Text>
              <Text className="text-gray-700 ml-2 w-55 ">
                Email: {detailBlog.owner == null ? "" : detailBlog.owner.email}
              </Text>
              <Text className="text-gray-700 ml-2 w-55 ">
                Phone: {detailBlog.owner == null ? "" : detailBlog.owner.phone}
              </Text>
            </View>
            <View className="flex flex-row justify-between pt-5 pb-5"></View>
          </View>
          <View className="flex-row w-full h-10">
            {numberLike == 0 ? (
              <TouchableOpacity
                onPress={() => {
                  LikeBlog(), setNumberLike(1);
                }}
                className=" flex-row  "
              >
                <View className="flex-row top-2">
                  <AntDesign name="like2" size={24} color="black" />
                  <Text className="pl-1 top-1">
                    {numberLikes != 0 ? numberLikes : 0}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  LikeBlog(), setNumberLike(0);
                }}
                className=" flex-row "
              >
                <View className="flex-row top-2">
                  <AntDesign name="like1" size={24} color="blue" />
                  <Text className="pl-1 top-1">
                    {numberLikes != 0 ? numberLikes : 0}
                  </Text>
                </View>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => {
                panelRef.current.togglePanel();
              }}
              className="flex-row top-2.5 ml-2.5"
            >
              <Ionicons
                name="chatbox-ellipses-outline"
                size={24}
                color="black"
              />
              <Text className="pl-1 ">{index == "" ? 0 : index}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="py-3 bg-blue-300 rounded-xl top-5">
            <Text className="text-xl font-bold text-center text-gray-700">
              Thuê Kho
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 w-full h-96">
        <BottomSheet
          isOpen={visible}
          ref={(ref) => {
            panelRef.current = ref;
          }}
          sliderMinHeight={0}
        >
          <View style={{ width: "100%", height: 300 }} className="">
            <View className="border-b-2 border-indigo-500">
              <Text className="font-bold text-xl text-center ">Bình luận</Text>
            </View>
            <FlatList
              data={listCommnets}
              // keyExtractor={(item) => String(item)}
              renderItem={({ item, index }) => FlatListComment(item, index)}
            />
          </View>
          <View className="w-full h-9  mb-3 flex-row border-t-2 border-indigo-500">
            {/* <Ionicons className="" name="send" size={23} color="black" /> */}
            <View className="" style={{ width: "92%" }}>
              <TextInput
                className=" w-full h-9"
                placeholder="nhập bình luận... "
                value={message}
                // clearButtonMode="always"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(text) => setMessage(text)}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                pustTextComment();
              }}
              className=" absolute right-0 top-1.5"
            >
              <Ionicons className="" name="send" size={23} color="black" />
            </TouchableOpacity>
          </View>
        </BottomSheet>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={AppStyle.StyleOderList.centeredView}>
          <Pressable
            style={[AppStyle.StyleOderList.buttonClose]}
            onPress={() => {
              setModalVisible(!modalVisible), setIdComment("");
            }}
          >
            <Ionicons
              name="close-outline"
              size={35}
              color="#000"
              style={AppStyle.StyleOderList.textStyle}
            />
          </Pressable>
          <View style={AppStyle.StyleOderList.modalView}>
            <TouchableOpacity
              onPress={() => DeleteItemComment()}
              className="w-full h-10 bg-blue-500 flex flex-row items-center m-1 rounded-md"
            >
              <MaterialIcons name="delete" size={24} color="black" />
              <Text>Xóa Bình Luận </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisibleUpdateTextComment(true)}
              className="w-full h-10 bg-blue-500 flex flex-row items-center m-1 rounded-md"
            >
              <MaterialCommunityIcons name="pencil" size={24} color="black" />
              <Text>Sửa Bình Luận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleUpdateTextComment}
        onRequestClose={() => {
          setModalVisibleUpdateTextComment(!modalVisibleUpdateTextComment);
        }}
      >
        <View style={AppStyle.StyleOderList.centeredView}>
          <Pressable
            style={[AppStyle.StyleOderList.buttonClose]}
            onPress={() => {
              setModalVisibleUpdateTextComment(!modalVisibleUpdateTextComment),
                setIdComment("");
            }}
          >
            <Ionicons
              name="close-outline"
              size={35}
              color="#000"
              style={AppStyle.StyleOderList.textStyle}
            />
          </Pressable>
          <View
            style={{
              width: "90%",
              height: 150,
              borderRadius: 10,
              backgroundColor: "#fff",
              textAlign: "center",
            }}
          >
            <Text className="font-bold text-xl text-center">Sửa Bình Luận</Text>
            <View className="absolute top-5 w-full">
              <TextInput
                style={{
                  width: "100%",
                  height: 35,
                  borderWidth: 1,
                  borderColor: "blue",
                  marginTop: 10,
                  justifyContent: "center",
                  borderRadius: 2,
                }}
                placeholder="nhập bình luận mới ... "
                onChangeText={(text) => setTextCommnetUpdate(text)}
                // value={text}
              />
            </View>
            <View className="flex-row absolute right-0 bottom-0">
              <TouchableOpacity
                onPress={() => {
                  setModalVisibleUpdateTextComment(
                    !modalVisibleUpdateTextComment
                  ),
                    setIdComment("");
                }}
                className="w-20 h-10 bg-red-500 flex flex-row items-center m-1 rounded-md"
              >
                <MaterialIcons name="delete" size={24} color="black" />
                <Text>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => UpdataItemComment()}
                className="w-auto h-10 bg-blue-500 flex flex-row items-center m-1 rounded-md"
              >
                <MaterialCommunityIcons name="pencil" size={24} color="black" />
                <Text>Cập nhật</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
