import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import {AuthContext} from '../context/AuthContext';
import Spinner from "react-native-loading-spinner-overlay";
import { AntDesign,Feather } from '@expo/vector-icons';

export default function ChangePassword({navigation}) {
  const [password, setPassword] = useState (null);
  const [ConfirmPassword, setConfirmPassword] = useState (null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);
  const { isLoading, changePassword } = useContext(AuthContext);

  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
    <Spinner visible={isLoading} />
      <SafeAreaView className="flex ">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/login.png")}
            style={{ width: 200, height: 200 }}
          />
        </View>
      </SafeAreaView>
      <View
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        className="flex-1 bg-white px-8 pt-8"
      >
        <Spinner visible={isLoading} />
        <View className="form space-y-2">
        <Text className="text-gray-700 ml-2 w-55 ">Password</Text>
        <View className="flex flex-row relative">
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-1.5 w-full"
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Enter Password"
            secureTextEntry={isShowPassword ? false : true}
          />
          <View className="absolute right-6 top-4">
          <Feather
           name={
            isShowPassword === true
                ? "eye"
                : "eye-off"
            } size={24} color="black" onPress={() => setIsShowPassword(!isShowPassword)}/>
            </View>
            </View>
                      <Text className="text-gray-700 ml-2 w-55 ">ConfirmPassword</Text>
          <View className="flex flex-row relative">
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-2 w-full"
            value={ConfirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            placeholder="Enter Password"
            secureTextEntry={isShowPasswordConfirm ? false : true}
          />
          <View className="absolute right-6 top-4">
          <Feather
           name={
            isShowPasswordConfirm === true
                ? "eye"
                : "eye-off"
            } size={24} color="black" onPress={() => setIsShowPasswordConfirm(!isShowPasswordConfirm)}/>
            </View>
            </View>

          <TouchableOpacity
            onPress={() => {
              login(username, password);
            }}
            className="py-3 bg-yellow-400 rounded-xl"
          >
            <Text className="text-xl font-bold text-center text-gray-700">
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-xl text-gray-700 font-bold text-center py-5">
          Or
        </Text>
      </View>
    </View>
  );
}
