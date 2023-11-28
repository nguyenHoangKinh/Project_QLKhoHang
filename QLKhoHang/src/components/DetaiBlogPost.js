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
    LikeBlog,
    DisLike,
    setIsVisible,
    ListComments,
    listCommnets,
    setListCommnets,
    pustComments,
    numberLike,
    setNumberLike,
    setNumberLikes,
    numberLikes,
    detailBlogListCommnetsId,
    DeleteTextCommentUser,
  } = useContext(AuthContext);
  const [imageView, setImageView] = useState("");
  const [index, setIndex] = useState("");
  const [idComment, setIdComment] = useState("");
  const [message, setMessage] = useState("");
  const [checkImageViewValue, setcheckImageViewValue] = useState([]);
  // const { itemId } = route.params;
  const panelRef = useRef(null);
  // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", numberLikes);

  
  useEffect(() => {
    DetailBlog();
    ListComments();
  }, []);
  const pustTextComment = () => {
    pustComments(message, detailBlogListCommnetsId);
    setMessage("");
  };
  const funcCheckLike = (item) => {
    if (item == 1) {
      // alert("like")
      LikeBlog(detailBlogListCommnetsId)
      // setNumberLikes(item);
    }
    if (item == 0) {
      // console.log("hello",item);
      // alert("dislike")
      DisLike(detailBlogListCommnetsId)
      // setNumberLikes(item);
      
    }
  }
  const DeleteItemComment = () => {
    Alert.alert(
      "",
      "Are you sure you want to delete?",
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
    // if (window.confirm(`bạn có chất là muốn xóa bình luận!`)) {
    //   // this.DeleteTextCommentUser();
    // }
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
    // console.log(item);
    setIndex(index + 1);
    return (
      <TouchableOpacity
        // onLongPress={() => DeleteItemComment()}
        onLongPress={() => {
          setModalVisible(true), setIdComment(item._id);
        }}
      >
        <Text className="flex flex-col w-32 h-10 bg-slate-200 m-2 rounded-lg text-left p-1">
          {item.content}
        </Text>
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
                    setNumberLike(""),
                    setNumberLikes(""),
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
              <TouchableOpacity onPress={() => {funcCheckLike(1)}} className=" flex-row  ">
                <View className="flex-row top-2">
                  <AntDesign name="like2" size={24} color="black" />
                  <Text className="pl-1 top-1">{numberLikes != 0 ? numberLikes : 0}</Text>
                </View>
                {console.log("shdlkashbkudhjhdcb uahwjgksdhnf cudsdjhgjvchn",0)}
              </TouchableOpacity>
              
            ) : (
              <TouchableOpacity onPress={() => {funcCheckLike(0)}} className=" flex-row ">
                <View className="flex-row top-2">
                  <AntDesign name="like1" size={24} color="blue" />
                  <Text className="pl-1 top-1">{numberLikes != 0 ? numberLikes : 0}</Text>
                </View>
                {console.log("shdlkashbkudhjhdcb uahwjgksdhnf cudsdjhgjvchn",1)}
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
          ref={(ref) => (panelRef.current = ref)}
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
              onPress={() => pustTextComment()}
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
            <TouchableOpacity className="w-full h-10 bg-blue-500 flex flex-row items-center m-1 rounded-md">
              <MaterialCommunityIcons name="pencil" size={24} color="black" />
              <Text>Sửa Bình Luận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
