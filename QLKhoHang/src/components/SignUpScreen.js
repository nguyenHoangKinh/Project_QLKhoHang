import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import CheckBox from "react-native-check-box";
import React, { useState, useContext } from "react";
import { themeColors } from "../theme";
import { AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import Spinner from "react-native-loading-spinner-overlay";
// import axios from "axios";

// subscribe for more videos like this :)
export default function SignUpScreen({ navigation }) {
  const [checkValue, setCheckValue] = useState(false);
  const [username, setUsername] = useState(null);
  const [address, setAddress] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [password, setPassword] = useState(null);
  // const [confirmPassword, setConfirmPassword] = useState(null);
  const { formError, isLoading, signUP, checkValueSignUp } =
    useContext(AuthContext);
  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <Spinner visible={isLoading} />
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/signup.png")}
            style={{ width: 165, height: 110 }}
          />
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="form space-y-0.1 ">
          <View className="flex flex-row justify-between">
            <Text className="text-gray-700 ml-2 w-55 ">UserName</Text>
            {formError.username && (
              <Text className="text-yellow-950  mr-3">
                {formError.username}
              </Text>
            )}
          </View>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-1.5"
            value={username}
            onChangeText={(text) => setUsername(text)}
            placeholder="Enter username..."
          />
          <View className="flex flex-row justify-between">
            <Text className="text-gray-700 ml-2 w-55 ">Address</Text>
            {formError.address && (
              <Text className="text-yellow-950  mr-3">
                {formError.address}
              </Text>
            )}
          </View>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-1.5"
            value={address}
            onChangeText={(text) => setAddress(text)}
            placeholder="Enter Address..."
          />
          <View className="flex flex-row justify-between">
            <Text className="text-gray-700 ml-2 w-55 ">Email</Text>
            {formError.email && (
              <Text className="text-yellow-950  mr-3">
                {formError.email}
              </Text>
            )}
          </View>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-1.5"
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter Email..."
          />
          <View className="flex flex-row justify-between">
            <Text className="text-gray-700 ml-2 w-55 ">Phone</Text>
            {formError.phone && (
              <Text className="text-yellow-950  mr-3">
                {formError.phone}
              </Text>
            )}
          </View>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-1.5"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            placeholder="Enter Phone..."
          />
          <View className="flex flex-row justify-between">
            <Text className="text-gray-700 ml-2 w-55 ">Password</Text>
            {formError.password && (
              <Text className="text-yellow-950  mr-3">
                {formError.password}
              </Text>
            )}
          </View>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-1.5"
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Enter Password"
            secureTextEntry={true}
          />
          <View className="flex flex-row justify-between">
            <Text className="text-gray-700 ml-2 w-55 ">ConfirmPassword</Text>
            {formError.confirmPassword && (
              <Text className="text-yellow-950  mr-3">
                {formError.confirmPassword}
              </Text>
            )}
          </View>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-2"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            placeholder="Enter Password"
            secureTextEntry={true}
          />
          <CheckBox
            isChecked={checkValue}
            onClick={() => setCheckValue(!checkValue)}
            rightText="Đăng ký bằng tài khoản nhân viên"
            rightTextStyle={{
              fontSize: 13,
              color: "black",
              fontWeight: "bold",
            }}
          />
          <TouchableOpacity
            className="py-3 bg-yellow-400 rounded-x1 mt-3"
            onPress={() => {
              signUP(
                username,
                password,
                confirmPassword,
                address,
                phone,
                email,
                checkValue
              ),
                checkValueSignUp
                  ? navigation.navigate("Login")
                  : console.log("dang ky that bai");
            }}
          >
            <Text className=" font-bold text-center text-gray-700">
              Sign Up
            </Text>
          </TouchableOpacity>

          {/* <Text>{console.log(checkValueSignUp)}</Text> */}
        </View>
        <Text className="text-l text-gray-700 text-center">Or</Text>
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
        <View className="flex-row justify-center mt-1">
          <Text className="text-gray-500 font-semibold">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text className="font-semibold text-yellow-500"> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
