import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState, useContext, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { AuthContext } from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import ImageView from "react-native-image-viewing";
import BottomSheet from "react-native-simple-bottom-sheet";
import ListChat from "./ListComments";
export default function DetaiBlogPost({ route, navigation }) {
  const { DetailBlog, detailBlog, showImgBlog, setShowImgBlog,visible } = useContext(AuthContext);
  const [imageView, setImageView] = useState("");
  const [imageViews, setImageViews] = useState([]);
  const [checkImageViewValue, setcheckImageViewValue] = useState([]);
  const panelRef = useRef(null);
  const { itemId } = route.params;
  // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", visible);

  setTimeout(() => {
    setImageViews([showImgBlog]);
  }, 1000);
  
  useEffect(() => {
    DetailBlog(itemId);
  }, []);


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
                    setImageViews([]),
                    setImageView(""),
                    setcheckImageViewValue([]),
                    setShowImgBlog([]);
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
        <View
          // style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
          className="flex-1 bg-white px-5 pt-6 pb-16 rounded-2xl"
        >
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
                      uri: imageView == "" ? `${showImgBlog.uri}` : imageView,
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
                checkImageViewValue == "" ? imageViews : checkImageViewValue
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
          <View className="static flex-row w-full h-10 ">
            <View className="flex-row top-2">
              <AntDesign name="hearto" size={24} color="black" />
              <Text className="pl-1">0</Text>
            </View>
            <TouchableOpacity
              onPress={() => panelRef.current.togglePanel()}
              className="flex-row top-2 pl-1"
            >
              <Ionicons
                name="chatbox-ellipses-outline"
                size={24}
                color="black"
              />
              <Text className="pl-1">0</Text>
            </TouchableOpacity>
            <Text className="absolute bottom-2 right-0">lược thích</Text>
          </View>
          {/* <View className="border-2 border-blue-400 mt-8">
          <Text className="text-gray-700 ml-2 w-55 text-lg">Thông tin kho</Text>
          <View className="flex flex-row justify-between pt-5 pb-5">
            <Text className="text-gray-700 ml-2 w-55 "></Text>
          </View>
          <View className="flex flex-row justify-between pt-5 pb-5">
            <Text className="text-gray-700 ml-2 w-55 ">Tên khách hàng:</Text>
          </View>
        </View> */}
          <TouchableOpacity className="py-3 bg-blue-300 rounded-xl top-5">
            <Text className="text-xl font-bold text-center text-gray-700">
              Thuê Kho
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomSheet isOpen={visible} ref={(ref) => (panelRef.current = ref)} sliderMinHeight={0}>
        <Text style={{ paddingVertical: 200 }}>Some random content</Text>
      </BottomSheet>
    </>
  );
}
