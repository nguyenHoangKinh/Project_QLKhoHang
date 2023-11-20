import { useContext, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, Image, TextInput, TouchableOpacity, View } from "react-native";
import AppStyle from "../theme";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

let stat = [
  {
    id: 0,
    st: "true",
  },
  {
    id: 1,
    st: "false",
  },
]

export default function UpdateWarehouseScreen({ navigation }) {
  const { userInfo } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [categorie, setCategorie] = useState();
  const [wareHouseName, setWareHouseName] = useState();
  const [address, setAddress] = useState();
  const [idCategorie, setIdCategorie] = useState();
  const [capacity, setCapacity] = useState();
  const [monney, setMonney] = useState();
  const [status, setStatus] = useState();
  const [description, setDescription] = useState();
  const [checkUpdate, setCheckUpdate] = useState(false);
  const route = useRoute();
  const idWarehouse = route.params?.idWarehouse;

  useEffect(() => {
    axios.get(`https://warehouse-management-api.vercel.app/v1/warehouse/category/list`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      }
    ).then((res) => {
      let categorie = res.data.categories;
      setCategories(categorie);
    }).catch((e) => {
      console.log(`get categories error ${e.res}`);
    });
  }, []);

  const updateWarehouse = (wareHouseName, address, category, capacity, monney, status, description) => {
    axios.put(`https://warehouse-management-api.vercel.app/v1/warehouse/updateWarehouse/${idWarehouse}`,
      {
        wareHouseName: wareHouseName,
        address: address,
        category: category,
        capacity: capacity,
        monney: monney,
        status: status,
        description: description,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      }
    ).then((res) => {
      setCheckUpdate(true);
    }).catch((e) => {
      console.log(`Update error ${e}`);
      setCheckUpdate(false);
    });
  };

  return (
    <View>
      <ScrollView style={{ marginTop: 50 }}>
        <View style={AppStyle.StyleProfile.items}>
          <FontAwesome5 name="warehouse" size={20} color="black" />
          <TextInput
            placeholder="Nhập tên kho hàng"
            keyboardType="default"
            value={wareHouseName}
            onChangeText={(text) => setWareHouseName(text)}
          />
        </View>
        <View style={AppStyle.StyleProfile.items}>
          <Entypo name="address" size={20} color="black" />
          <TextInput
            placeholder="Nhập địa chỉ kho hàng"
            keyboardType="default"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
        </View>
        <Dropdown
          style={AppStyle.StyleListProduct.dropdown}
          placeholderStyle={AppStyle.StyleListProduct.placeholderStyle}
          selectedTextStyle={AppStyle.StyleListProduct.selectedTextStyle}
          inputSearchStyle={AppStyle.StyleListProduct.inputSearchStyle}
          iconStyle={AppStyle.StyleListProduct.iconStyle}
          data={categories}
          maxHeight={300}
          labelField="name"
          valueField="_id"
          placeholder="Chọn danh mục"
          // searchPlaceholder="Search..."
          // value={name}
          onChange={(item) => {
            setIdCategorie(item._id);
            setCategorie(item.acreage);
          }}
        />
        <View style={AppStyle.StyleProfile.items}>
          <MaterialIcons name="storage" size={20} color="black" style={{ marginTop: 2 }} />
          <TextInput
            placeholder="Nhập dung tích"
            keyboardType="numeric"
            value={capacity}
            onChangeText={(text) => setCapacity(text)}
          />
          <Text style={{ fontSize: 16, marginTop: 2 }}> {categorie}</Text>
        </View>
        <View style={AppStyle.StyleProfile.items}>
          <FontAwesome name="money" size={20} color="black" />
          <Text> </Text>
          <TextInput
            placeholder="Nhập số tiền"
            keyboardType="numeric"
            value={monney}
            onChangeText={(text) => setMonney(text)}
          />
        </View>
        <Dropdown
          style={AppStyle.StyleListProduct.dropdown}
          placeholderStyle={AppStyle.StyleListProduct.placeholderStyle}
          selectedTextStyle={AppStyle.StyleListProduct.selectedTextStyle}
          inputSearchStyle={AppStyle.StyleListProduct.inputSearchStyle}
          iconStyle={AppStyle.StyleListProduct.iconStyle}
          data={stat}
          maxHeight={300}
          labelField="st"
          valueField="id"
          placeholder="Thiết lập trạng thái"
          onChange={(item) => {
            { item.id === 0 ? setStatus(true) : setStatus(false) }
          }}
        />
        <View style={AppStyle.StyleProfile.items}>
          <FontAwesome5 name="sticky-note" size={20} color="black" />
          <TextInput
            placeholder="Nhập ghi chú"
            keyboardType="default"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <TouchableOpacity
          style={AppStyle.StyleProfile.btn_edit}
          onPress={() => {
            updateWarehouse(wareHouseName, address, idCategorie, capacity, monney, status, description);
            { checkUpdate ? navigation.navigate("UpdateWarehouseScreen") : navigation.navigate("WarehouseScreem"); }
          }}>
          <AntDesign name="edit" size={20} color="#fff" />
          <Text style={{ color: "#fff" }}>CẬP NHẬT</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={AppStyle.StyleProfile.btn_logout}
          onPress={() => navigation.navigate("HomeNavigation")}
        >
          <Text style={{ color: "#fff" }}>HỦY</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
