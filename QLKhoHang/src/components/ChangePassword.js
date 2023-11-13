import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { AuthContext } from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import { AntDesign, Feather } from "@expo/vector-icons";

export default function ChangePassword({ navigation }) {
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const {
    isLoading,
    chengePassword,
    naviga,
    formErrorChangePassword,
    setFormErrorChangePassword,
    setNaviga,
  } = useContext(AuthContext);
  {
    naviga
      ? navigation.navigate("HomeNavigation")
      : console.log("cap nhat mat khau that bai");
  }
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
              navigation.goBack(),
                setFormErrorChangePassword(""),
                setNaviga(false);
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
        {formErrorChangePassword && (
          <Text className="text-yellow-950  mr-3 mb-3 h-10">
            {formErrorChangePassword}
          </Text>
        )}
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Password</Text>
          <View className="flex flex-row relative">
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3 w-full"
              value={password}
              placeholder="Enter password..."
              onChangeText={(text) => setPassword(text)}
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
          <Text className="text-gray-700 ml-4">Confirm Password</Text>
          <View className="flex flex-row relative">
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl w-full"
              value={confirmPassword}
              placeholder="Enter Confirmpassword"
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry={isShowConfirmPassword ? false : true}
            />
            <View className="absolute right-6 top-4">
              <Feather
                name={isShowConfirmPassword === true ? "eye" : "eye-off"}
                size={24}
                color="black"
                onPress={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              chengePassword(password, confirmPassword),
                setFormErrorChangePassword(""),
                setNaviga(false);
            }}
            className="py-3 bg-yellow-400 rounded-xl top-5"
          >
            <Text className="text-xl font-bold text-center text-gray-700">
              Cập Nhật
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="py-3 bg-yellow-400 rounded-xl top-5"
            onPress={() => {
              navigation.navigate("HomeNavigation");
            }}
            // disabled={password && confirmPassword ? false : true}
          >
            <Text className="text-xl font-bold text-center text-gray-700">
              Hủy
            </Text>
          </TouchableOpacity>
        </View>
        {/* <Text className="text-xl text-gray-700 font-bold text-center py-5">
          Or
        </Text> */}
        {/* <View className="flex-row justify-center space-x-12">
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image
              source={require("../assets/icons/google.png")}
              className="w-10 h-10"
            />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image
              source={require("../assets/icons/apple.png")}
              className="w-10 h-10"
            />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image
              source={require("../assets/icons/facebook.png")}
              className="w-10 h-10"
            />
          </TouchableOpacity>
        </View> */}
        {/* <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text className="font-semibold text-yellow-500"> Sign Up</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
}
