import { useContext, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, Image, TouchableOpacity, View } from "react-native";
import AppStyle from "../../theme";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

const DetailAcount = ({ navigation }) => {
  const { userInfo, splashLoading } = useContext(AuthContext);
  const [accounts, setAccounts] = useState();
  const route = useRoute();
  const idWarehouse = route.params?.idWarehouse;

  useEffect(() => {
    axios
      .get(
        `https://warehouse-management-api.vercel.app/v1/auth/account-by-id`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
          },
          params: {
            id: idWarehouse,
          },
        }
      )
      .then((res) => {
        let accounts = res.data.others;
        console.log(accounts);
        setAccounts(accounts);
      })
      .catch((e) => {
        console.log(`Get account error ${e}`);
      });
  }, []);

  return (
    <View>
      <ScrollView style={{ marginTop: 50 }}>
        {accounts && (
          <>
            <Text
              style={{
                flex: 1,
                fontSize: 15,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Chi tiết của Tai Khoan {accounts.username}
            </Text>
            <View style={AppStyle.StyleProfile.items}>
              <FontAwesome5 name="user" size={20} color="black" />
              <Text> {accounts.username}</Text>
            </View>
            <View style={AppStyle.StyleProfile.items}>
              <MaterialIcons name="email" size={20} color="black" />
              <Text>{accounts.email}</Text>
            </View>
            <View style={AppStyle.StyleProfile.items}>
              <Entypo name="address" size={20} color="black" />
              <Text>{accounts.address}</Text>
            </View>
            <View style={AppStyle.StyleProfile.items}>
              <MaterialIcons name="phone" size={20} color="black" />
              <Text>{accounts.phone}</Text>
            </View>
          </>
        )}
        <TouchableOpacity
          style={AppStyle.StyleProfile.btn_logout}
          onPress={() => navigation.navigate("HomeNavigationAdmin")}
        >
          <Text style={{ color: "#fff" }}>QUAY LẠI</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default DetailAcount;
