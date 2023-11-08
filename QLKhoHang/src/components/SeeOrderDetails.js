import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import {AuthContext} from '../context/AuthContext';
import Spinner from "react-native-loading-spinner-overlay";
import { AntDesign,Feather } from '@expo/vector-icons';
import axios from "axios";


export default function SeeOrderDetails({navigation}) {
  const [userInfo, setUserInfo] = useState({});
  // const { OrderDetail } = useContext(AuthContext);
  // console.log(OrderDetail);
  const OrderDetail = () => {
    // setIsLoading(true);
    axios
      .get(`https://warehouse-management-api.vercel.app/v1/order/getAOrder?id=654bf0650a5879d51392ee2e`,{
        headers: {
           Authorization: `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzkzMDc4ZTM2MjQ5ODkwZDRjZjQ1OCIsImlzT3duZXIiOnRydWUsImlhdCI6MTY5OTQ3Mzk4NSwiZXhwIjoxNjk5NDgxMTg1fQ.l-kcuhX1D8zmhPmImgfz0XKMYLhhuMyWeGjKWJRyiHA` 
          }
      })
      .then((res) => {
        let userInfo = res.data.Order;
        // console.log(res.data.Order);
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`update error ${e.response.data.message}`);
        setIsLoading(false);
      });
  }
  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <SafeAreaView className="flex h-120">
        <View className="flex-row justify-start top-5">
          <TouchableOpacity
            // onPress={() => navigation.goBack()}
            className="bg-white p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-2xl text-center font-semibold left-28" >
            Hoa Don
        </Text>
        </View>
        <View className="flex-row justify-center mt-3 mb-3" style={{ width: 390, height: 70 }}>
          {/* <Image
        //   className="bg-slate-950"
            source={require("../assets/images/login.png")}
            style={{ width: 390, height: 360 }}
          /> */}
        </View>
      </SafeAreaView>
      <View
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        className="flex-1 bg-white px-8 pt-8 ">
        <View className=" bg-slate-300 top-12">
            <Text className="text-gray-700 ml-2 w-55 text-lg p-2 ">
            Thong tin hoa don
            </Text>

            <Text className="text-yellow-950  mr-3 pt-4 pb-4 text-center text-2xl">
                {userInfo.money}$ 
              </Text>

              <Text className="text-yellow-950  mr-3 p-4">
                ten chu kho: {userInfo.owner}
              </Text>
              <Text className="text-yellow-950  mr-3 p-4">
                ten kho:{userInfo.warehouses}
              </Text>
              <Text className="text-yellow-950  mr-3 p-4">
                thoi gian thue:{userInfo.rentalTime}
              </Text>

          </View>
        <View className=" bg-slate-300 mt-16">
            <Text className="text-gray-700 ml-2 w-55 text-lg">
            Thong tin ben mua 
            </Text>
            <View className="flex flex-row justify-between pt-5 pb-5">
            <Text className="text-gray-700 ml-2 w-55 ">
                ten khach hang:{userInfo.user}
            </Text>
              <Text className="text-yellow-400  mr-3 text-base">
              xem
              </Text>

          </View>
          </View>
          <TouchableOpacity
            className="py-3 bg-yellow-400 rounded-xl top-5"
            onPress={() => {
              OrderDetail()
            }}
          >
            <Text className="text-xl font-bold text-center text-gray-700">
              Hủy Don 
            </Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}
