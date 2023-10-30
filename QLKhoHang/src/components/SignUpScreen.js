import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState,useContext } from "react";
import { themeColors } from "../theme";
import {AuthContext} from '../context/AuthContext';
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import Spinner from 'react-native-loading-spinner-overlay';
// import axios from "axios";

// subscribe for more videos like this :)
export default function SignUpScreen({navigation}) {
    const [username, setUsername] = useState(null);
    const [address, setAddress] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const {isLoading, signUP} = useContext(AuthContext);
//   const [credentials, setCredentials] = useState({});
//   const handleChange = (e) => {
//     setCredentials({
//       ...credentials,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleLogin = () => {
//     // perform the login request
//     axios
//       .post("https://warehouse-management-api.vercel.app/v1/auth/login", {
//         username: username,
//         password: password,
//       })
//       .then((response) => {
//         if (response.data) {
//           alert("dang nhap thanh cong");
//           const token = response.data.accessToken;
//           localStorage.setItem("token", token);
//           setAuthenticationHeader(token);
//           // set default headers
//           console.log("token:", token);
//           // console.log("token:",CategoryWarehouseService(token));

//           // navigate("/registeraccount");
//           // props.history.push('/registeraccount', token);
//           localStorage.setItem("username", credentials.username);
//           // props.onLoggedIn();
//         //   window.location.href = "/CategoryWarehouse";
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
  // const navigation = useNavigation();
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
        <View className="form space-y-0.1">
          <Text className="text-gray-700 ml-1">UserName</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-1.5"
            // name="username"
            value={username}
            setValue={setUsername}
            onChangeText={text => setUsername(text)}
            placeholder="Enter username..."
          />
          <Text className="text-gray-700 ml-1">Address</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-1.5"
                value={address}
            onChangeText={text => setAddress(text)}
            placeholder="Enter Address..."
            />
          <Text className="text-gray-700 ml-1">Email </Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-1.5"
                value={email}
            onChangeText={text => setEmail(text)}
            placeholder="Enter Email..."
            />
          <Text className="text-gray-700 ml-1">Phone</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-1.5"
                value={phone}
            onChangeText={text => setPhone(text)}
            placeholder="Enter Phone..."
            />
          <Text className="text-gray-700 ml-1">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-1.5"
            value={password}
            onChangeText={text => setPassword(text)}
            placeholder="Enter Password"
            secureTextEntry={true}
          />
          <Text className="text-gray-700 ml-1">confirm Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-5"
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            placeholder="Enter Password"
            secureTextEntry={true}
          />
          <TouchableOpacity
            className="py-3 bg-yellow-400 rounded-xl"
            onPress={() => {
            signUP(username, password, confirmPassword, address, phone, email );
          }}
            // type="TERTIARY"
          >
            <Text className="font-xl font-bold text-center text-gray-700">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        {/* <Text className="text-xl text-gray-700 font-bold text-center py-5">
          Or
        </Text>
        <View className="flex-row justify-center space-x-12">
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
        <View className="flex-row justify-center mt-7">
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
