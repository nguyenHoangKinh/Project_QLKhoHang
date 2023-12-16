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
// import BottomSheet from "react-native-simple-bottom-sheet";
export default function DetaiBlogPost({ route, navigation }) {
  const {
    DetailBlog,
    detailBlog,
    showImgBlog,
    setShowImgBlog,
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
    modalVisibleComment,
    UpdataTextCommentUser,
    detailBlogListCommnetsId,
    DeleteTextCommentUser,
    setModalVisibleComment,
    modalVisibleUpdateTextComment,
    setModalVisibleUpdateTextComment,
  } = useContext(AuthContext);
  const [imageView, setImageView] = useState("");
  const [idCommentUpdata, setIdCommentUpdata] = useState("");
  const [message, setMessage] = useState("");
  const [textCommnetUpdate, setTextCommnetUpdate] = useState("");
  const [checkImageViewValue, setcheckImageViewValue] = useState([]);
  // const { itemId } = route.params;
  // const panelRef = useRef(null);
  // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", idCommentUpdata);

  useEffect(() => {
    DetailBlog();
  }, []);
  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };
  const pustTextComment = () => {
    pustComments(message);
    setMessage("");
  };
  const DeleteItemComment = (idComment, id) => {
    if (id === userInfo.others._id) {
      Alert.alert(
        "",
        "Bạn có chất là muốn xóa bình luận này?",
        [
          {
            text: "Cancel",
            onPress: () => {
              navigation.navigate("DetaiBlogPost");
            },
            style: "cancel",
          },
          { text: "OK", onPress: () => DeleteTextCommentUser(idComment) },
        ],
        { cancelable: false }
      );
    } else {
      alert("bạn không thể chỉnh sửa bình luận của người khác!");
    }
  };
  const UpdataItemComment = () => {
    if (idCommentUpdata) {
      if (idCommentUpdata.account._id === userInfo.others._id) {
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
                  navigation.navigate("DetaiBlogPost");
                },
                style: "cancel",
              },
              {
                text: "OK",
                onPress: () =>
                  UpdataTextCommentUser(textCommnetUpdate, idCommentUpdata._id),
              },
            ],
            { cancelable: false }
          );
        }
      } else {
        alert("bạn không thể chỉnh sửa bình luận của người khác!");
      }
    } else {
      alert(" cap nhat comment khong thanh cong");
    }
  };
  const FlatListData = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setcheckImageViewValue([{ uri: item }]), setImageView(item);
        }}
        className="w-28 h-28 m-0.5 p-"
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
    // setIndex(index + 1);
    // console.log(item);
    return (
      <View className="flex flex-row bg-slate-200 m-2 rounded-lg text-left p-2">
        <View style={{ width: "10%" }}>
          <View
            className="flex-row absolute w-8 h-8"
            style={{ top: -20, left: -12 }}
          >
            <Image
              className="w-full h-full rounded-full"
              source={{
                uri: `${item.account.avatar}`,
              }}
            />
            <Text
              style={{
                fontSize: 9,
                color: "black",
                width: 100,
              }}
              className=" top-3 left-1"
            >
              {item.account.username}
            </Text>
          </View>
        </View>
        <View className="top-1" style={{ width: "70%" }}>
          <Text className="">{item.content}</Text>
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
        {item.account._id == userInfo.others._id ? (
          <View
            className="flex-row justify-self-center"
            style={{ width: "10%" }}
          >
            <TouchableOpacity
              onPress={() => {
                DeleteItemComment(item._id, item.account._id);
              }}
            >
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
            <TouchableOpacity
              className="relative left-2"
              onPress={() => {
                setIdCommentUpdata(item);
                setModalVisibleUpdateTextComment(true);
              }}
            >
              <MaterialCommunityIcons name="pencil" size={24} color="blue" />
            </TouchableOpacity>
          </View>
        ) : (
          ""
        )}
      </View>
    );
  };
  return (
    <ScrollView
      className="w-full h-auto bg-white "
      style={{ backgroundColor: themeColors.bg }}
    >
      <View>
        <View className=" top-4 start-50 translate-middle">
          <View className=" flex-row w-full top-5">
            <TouchableOpacity
              onPress={() => {
                {
                  navigation.goBack(),
                    setIndex(""),
                    setNumberLike(0),
                    setNumberLikes(0),
                    setImageView(""),
                    setListCommnets([]);
                  setcheckImageViewValue([]), setShowImgBlog([]);
                }
              }}
              className="left-4 top-3"
              style={{ width: "15%" }}
            >
              <AntDesign name="arrowleft" size={30} color="#fff" />
            </TouchableOpacity>
            <Text
              className="text-2xl text-center font-semibold top-2 "
              style={{ color: "#fff", width: "70%" }}
            >
              Thông Tin Kho
            </Text>
            <TouchableOpacity style={{ width: "15%" }} className="top-2 ">
              <AntDesign name="pluscircleo" size={36} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex w-full h-full bg-white mt-14 pb-16 ">
          {showImgBlog == "" ? (
            ""
          ) : (
            <View className=" w-full border-solid drop-shadow-xl">
              <View className="w-full h-96">
                <TouchableOpacity
                  onPress={() => setIsVisible(true)}
                  className="w-full "
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
          <View
            className="w-full h-3"
            style={{ backgroundColor: "#f5f5f5" }}
          ></View>
          <View className=" drop-shadow-xl">
            <Text className="text-lg ml-2">{detailBlog.description}</Text>
          </View>
          <View
            className="w-full h-3"
            style={{ backgroundColor: "#f5f5f5" }}
          ></View>
          <View className=" mt-1">
            <Text className="font-medium ml-2 w-55 text-2xl">
              Thông tin kho
            </Text>
            <View className="flex-row ml-2 ">
              <Text className="text-base font-medium">Tên kho: </Text>
              <Text className="top-1">
                {detailBlog.warehouse == null
                  ? ""
                  : detailBlog.warehouse.wareHouseName}
              </Text>
            </View>
            <View className="flex-row ml-2 ">
              <Text className="text-base font-medium">Diện tích: </Text>
              <Text className="top-1">
                {detailBlog.warehouse == null
                  ? ""
                  : detailBlog.warehouse.capacity}
              </Text>
            </View>
            <View className="flex-row ml-2 ">
              <Text className="text-base font-medium">Giá thuê: </Text>
              <Text className="top-1">
                {detailBlog.warehouse == null
                  ? ""
                  : detailBlog.warehouse.monney}
              </Text>
            </View>
            <Text className="font-medium text-2xl ml-2 w-55 ">
              Thông tin chủ kho
            </Text>
            <View className="flex-row ml-2 ">
              <Text className="text-base font-medium">Tên chủ kho: </Text>
              <Text className="top-1">
                {detailBlog.owner == null ? "" : detailBlog.owner.username}
              </Text>
            </View>
            <View className="flex-row ml-2 ">
              <Text className="text-base font-medium">Email: </Text>
              <Text className="top-1">
                {detailBlog.owner == null ? "" : detailBlog.owner.email}
              </Text>
            </View>
            <View className="flex-row ml-2 ">
              <Text className="text-base font-medium">Phone: </Text>
              <Text className="top-1">
                {detailBlog.owner == null ? "" : detailBlog.owner.phone}
              </Text>
            </View>
          </View>
          <View
            className="w-full h-3"
            style={{ backgroundColor: "#f5f5f5" }}
          ></View>
          <View className="flex-row w-full h-10 ml-2">
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
                  <AntDesign
                    style={{ opacity: 0.85 }}
                    name="like1"
                    size={24}
                    color="#6d2bf1"
                  />
                  <Text className="pl-1 top-1">
                    {numberLikes != 0 ? numberLikes : 0}
                  </Text>
                </View>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => {
                setModalVisibleComment(true);
                ListComments();
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

          <TouchableOpacity className="py-3 bg-blue-300 rounded-xl top-5 w-2/3 left-16">
            <Text className="text-xl font-bold text-center text-white">
              Thuê Kho
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleComment}
        onRequestClose={() => {
          setModalVisibleComment(!modalVisibleComment);
        }}
      >
        <View style={AppStyle.StyleOderList.centeredView}>
          <Pressable
            style={[AppStyle.StyleOderList.buttonClose]}
            onPress={() => {
              setModalVisibleComment(!modalVisibleComment);
            }}
          >
            <Ionicons
              name="close-outline"
              size={35}
              color="#fff"
              style={AppStyle.StyleOderList.textStyle}
            />
          </Pressable>
          <View style={AppStyle.StyleOderList.modalView}>
            <View style={{ width: "100%", height: 400 }}>
              <View className="border-b-2 border-indigo-500">
                <Text className="font-bold text-xl text-center ">
                  Bình luận
                </Text>
              </View>
              {listCommnets != "" ? (
                <FlatList
                  data={listCommnets}
                  // keyExtractor={(item) => String(item)}
                  renderItem={({ item, index }) => FlatListComment(item, index)}
                />
              ) : (
                <Text
                  className="flex text-center text-lg font-bold top-1/2"
                  style={{ color: "#16247d" }}
                >
                  Không có bình luận!
                </Text>
              )}
            </View>
            <View className="w-full  mb-3 flex-row border-t-2 border-indigo-500">
              <View className="" style={{ width: "92%" }}>
                <TextInput
                  className=" w-full h-9"
                  placeholder="nhập bình luận... "
                  value={message}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(text) => setMessage(text)}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  {
                    message != "" ? pustTextComment() : "";
                  }
                }}
                className=" absolute right-0 top-1.5"
              >
                <Ionicons className="" name="send" size={23} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="none"
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
              setModalVisibleUpdateTextComment(!modalVisibleUpdateTextComment);
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
                  );
                }}
                className="w-20 h-10 bg-red-500 flex flex-row items-center m-1 rounded-md"
              >
                <MaterialIcons name="delete" size={24} color="black" />
                <Text>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  textCommnetUpdate != "" ? UpdataItemComment() : "";
                }}
                className="w-auto h-10 bg-blue-500 flex flex-row items-center m-1 rounded-md"
              >
                <MaterialCommunityIcons name="pencil" size={24} color="black" />
                <Text>Cập nhật</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
