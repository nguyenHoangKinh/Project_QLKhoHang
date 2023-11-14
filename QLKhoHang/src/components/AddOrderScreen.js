import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useEffect,useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import {AuthContext} from '../context/AuthContext';
import Spinner from "react-native-loading-spinner-overlay";
import { AntDesign,Feather } from '@expo/vector-icons';
import axios from "axios";


export default function AddOrderScreen({navigation}) {
    const [money,setMoney] = useState({});
    const [owner,setowner] = useState({});
    const [warehouses,setWarehouses] = useState({});
    const [rentalTime,setRentalTime] = useState({});
//   const { OrderDetail,DetailOrder,setDetailOrder,setIdOrder,check,setCheck } = useContext(AuthContext);
//   // console.log(DetailOrder.Order.money);
//   useEffect(() => {
//     OrderDetail()
//   }, []);
  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <SafeAreaView className="flex h-120">
        <View className="flex-row justify-start top-5">
          <TouchableOpacity
            onPress={() => {navigation.goBack()}}
            className="bg-blue-300 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-2xl text-center font-semibold left-24" >
            Them Don
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
      <View style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        className="flex-1 bg-white px-8 pt-8 ">
      <View className="form space-y-0.1 ">
          <View className="flex flex-row justify-between">
            <Text className="text-gray-700 ml-2 w-55 ">Money</Text>
            {/* {formError.username && (
              <Text className="text-yellow-950  mr-3">
                {formError.username}
              </Text>
            )} */}
          </View>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-1.5"
            value={money}
            onChangeText={(text) => setMoney(text)}
            placeholder="Enter money..."
          />
          <View className="flex flex-row justify-between">
            <Text className="text-gray-700 ml-2 w-55 ">Owner</Text>
            {/* {formError.address && (
              <Text className="text-yellow-950  mr-3">
                {formError.address}
              </Text>
            )} */}
          </View>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-1.5"
            value={owner}
            onChangeText={(text) => setowner(text)}
            placeholder="Enter owner..."
          />
          <View className="flex flex-row justify-between">
            <Text className="text-gray-700 ml-2 w-55 ">Warehouses</Text>
            {/* {formError.email && (
              <Text className="text-yellow-950  mr-3">
                {formError.email}
              </Text>
            )} */}
          </View>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-1.5"
            value={warehouses}
            onChangeText={(text) => setWarehouses(text)}
            placeholder="Enter warehouses..."
          />
          <View className="flex flex-row justify-between">
            <Text className="text-gray-700 ml-2 w-55 ">RentalTime</Text>
            {/* {formError.phone && (
              <Text className="text-yellow-950  mr-3">
                {formError.phone}
              </Text>
            )} */}
          </View>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-1.5"
            value={rentalTime}
            onChangeText={(text) => setRentalTime(text)}
            placeholder="Enter Phone..."
          />
          <TouchableOpacity
            className="py-3 bg-blue-300 rounded-x1 mt-3"
            // onPress={() => {
            //   signUP(
            //     username,
            //     password,
            //     confirmPassword,
            //     address,
            //     phone,
            //     email,
            //     checkValue
            //   ),
            //     checkValueSignUp
            //       ? navigation.navigate("Login")
            //       : console.log("dang ky that bai");
            // }}
          >
            <Text className=" font-bold text-center text-gray-700">
              Add Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
