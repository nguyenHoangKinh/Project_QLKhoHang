import { StatusBar } from "expo-status-bar";
import { useContext, useState, useEffect } from "react";
import { ScrollView, Text, Image, TouchableOpacity, View } from "react-native";
import AppStyle from "../theme";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function ProfileScreen({ navigation }) {
  const { userInfo, logout, setFormErrorChangePass, setCheck } = useContext(AuthContext);
  const [profile, setProfile] = useState();

  useEffect(() => {
    axios.get(`https://warehouse-management-api.vercel.app/v1/auth/profile`, {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
      params: {
        id: userInfo.others._id,
      },
    }).then((res) => {
      let profile = res.data.others;
      setProfile(profile);
    }).catch((e) => {
      console.log(`Get post error ${e.res}`);
    });
  }, [profile]);

  return (
    <View>
      <ScrollView>
        <View
          style={{
            padding: 10,
            width: "100%",
            backgroundColor: "#000",
            height: 150,
          }}
        >
          <TouchableOpacity>
            <Image
              source={require("../assets/adaptive-icon.png")}
              style={{ width: 30, height: 30 }}
            ></Image>
            <View></View>
            <View></View>
          </TouchableOpacity>
        </View>
        {profile ?
          (<View style={{ alignItems: "center" }}>
            <Image
              source={{ uri: `${profile.avatar}` }}
              style={AppStyle.StyleProfile.avatar}
            ></Image>
            <Text style={AppStyle.StyleProfile.name}>
              {profile.username}
            </Text>
            <Text style={AppStyle.StyleProfile.email}>
              {profile.email}
            </Text>
          </View>) : ""}

        {profile &&
          <View style={AppStyle.StyleProfile.items}>
            <Entypo
              name="phone"
              size={20}
              color="black"
              style={{ marginRight: 10 }}
            />
            <Text>{profile.phone}</Text>
          </View>}
        {profile &&
          <View style={AppStyle.StyleProfile.items}>
            <Entypo
              name="address"
              size={20}
              color="black"
              style={{ marginRight: 10 }}
            />
            <Text>{profile.address}</Text>
          </View>}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ChangePasswordScreen"),
              setFormErrorChangePass("");
          }}
          className="flex items-end top-5 right-7"
        >
          <Text className="text-gray-700 mb-5">Change Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={AppStyle.StyleProfile.btn_edit}
          onPress={() => navigation.navigate("EditProfileScreen")}>
          <AntDesign name="edit" size={20} color="#fff" />
          <Text style={{ color: "#fff" }}>Cập nhật thông tin cá nhân</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={AppStyle.StyleProfile.btn_logout}
          onPress={logout}
        >
          <MaterialCommunityIcons name="logout" size={20} color="#fff" />
          <Text style={{ color: "#fff" }}>Đăng Xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
