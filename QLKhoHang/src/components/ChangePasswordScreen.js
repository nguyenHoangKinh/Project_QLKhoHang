import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { AuthContext } from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import { AntDesign, Feather } from "@expo/vector-icons";

export default function ChangePasswordScreen({ navigation }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);
  const { isLoading, changePassword, formError, check, setCheck } = useContext(AuthContext);
console.log(check);
  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <Spinner visible={isLoading} />
      <SafeAreaView className="flex ">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
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
        {formError && (
          <Text className="text-yellow-950  mr-3">{formError}</Text>
        ) }
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
                name={isShowPassword === true ? "eye" : "eye-off"}
                size={24}
                color="black"
                onPress={() => setIsShowPassword(!isShowPassword)}
              />
            </View>
          </View>
          <Text className="text-gray-700 ml-2 w-55 ">ConfirmPassword</Text>
          <View className="flex flex-row relative">
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-2 w-full"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              placeholder="Enter Password"
              secureTextEntry={isShowPasswordConfirm ? false : true}
            />
            <View className="absolute right-6 top-4">
              <Feather
                name={isShowPasswordConfirm === true ? "eye" : "eye-off"}
                size={24}
                color="black"
                onPress={() => setIsShowPasswordConfirm(!isShowPasswordConfirm)}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              changePassword(password, confirmPassword)
            }}
            
            className="py-3 bg-yellow-400 rounded-xl"
          >
          {/* {check ? (setCheck(false),alert("doi mat khau ko thanh cong")) : } */}
            <Text className="text-xl font-bold text-center text-gray-700">
              ChangePassword
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
