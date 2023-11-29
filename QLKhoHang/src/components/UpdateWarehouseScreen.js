import { useContext, useState, useEffect } from "react";
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
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

let stat = [
  {
    id: 0,
    st: "true",
    status: "Hoạt động",
  },
  {
    id: 1,
    st: "false",
    status: "Ngưng hoạt động",
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
  const [currentCapacity, setCurrentCapacity] = useState();
  const [monney, setMonney] = useState();
  const [status, setStatus] = useState();
  const [description, setDescription] = useState();
  const [checkUpdate, setCheckUpdate] = useState(false);
  const [warehouses, setWarehouse] = useState();
  const route = useRoute();
  const [images, setImages] = useState();
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

    axios.get(`https://warehouse-management-api.vercel.app/v1/warehouse/getAWarehouse`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
        params: {
          id: idWarehouse,
        },
      }
    ).then((res) => {
      let warehouse = res.data.warehouse;
      setWarehouse(warehouse);
    }).catch((e) => {
      console.log(`Get warehouse error ${e}`);
    });
  }, []);

  const updateWarehouse = (wareHouseName, address, category, currentCapacity, monney, status, description, images) => {
    axios.put(`https://warehouse-management-api.vercel.app/v1/warehouse/updateWarehouse/${idWarehouse}`,
      {
        wareHouseName: wareHouseName,
        address: address,
        category: category,
        currentCapacity: currentCapacity,
        monney: monney,
        status: status,
        description: description,
        images: images,
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

  const pickFromGalary = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        base64: true
      });

      console.log(data.assets)

      if (!data.canceled) {
        let newFile = {
          uri: data.assets[0].uri,
          type: data.assets[0].type,
          name: data.assets[0].name,
        };
        setImages(data.assets.base64);
      }
    } else { Alert.alert('Chưa chọn hình ảnh'); }
  }

  return (
    <View>
      <ScrollView style={{ marginTop: 50 }}>
        <View style={AppStyle.StyleProfile.items}>
          <FontAwesome5 name="warehouse" size={20} color="black" />
          {warehouses &&
            <TextInput
              placeholder={warehouses.wareHouseName}
              keyboardType="default"
              value={wareHouseName}
              onChangeText={(text) => setWareHouseName(text)}
            />}
        </View>
        <View style={AppStyle.StyleProfile.items}>
          <Entypo name="address" size={20} color="black" />
          {warehouses &&
            <TextInput
              placeholder={warehouses.address}
              keyboardType="default"
              value={address}
              onChangeText={(text) => setAddress(text)}
            />}
        </View>
        {warehouses &&
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
            placeholder={warehouses.category.name}
            onChange={(item) => {
              setIdCategorie(item._id);
              setCategorie(item.acreage);
            }}
          />}
          
        <View style={AppStyle.StyleProfile.items}>
          <MaterialIcons name="storage" size={20} color="black" style={{ marginTop: 2 }} />
          {warehouses &&
          <TextInput
            placeholder={warehouses.currentCapacity + ""}
            keyboardType="numeric"
            value={currentCapacity}
            onChangeText={(text) => setCurrentCapacity(text)}
          />}
          <Text style={{ fontSize: 16, marginTop: 2 }}> {categorie}</Text>
        </View>
        
        <View style={AppStyle.StyleProfile.items}>
          <MaterialIcons name="storage" size={20} color="black" style={{ marginTop: 2 }} />
          {warehouses &&
          <Text style={{  marginTop: 2 }}>{warehouses.currentCapacity}</Text>}
          <Text style={{ fontSize: 16, marginTop: 2 }}> {categorie}</Text>
        </View>
        <View style={AppStyle.StyleProfile.items}>
          <FontAwesome name="money" size={20} color="black" />
          {warehouses &&
            <TextInput
              placeholder={warehouses.monney + ""}
              keyboardType="numeric"
              value={monney}
              onChangeText={(text) => setMonney(text)}
              style={{ marginTop: -3 }}
            />}
        </View>
        {warehouses &&
          <Dropdown
            style={AppStyle.StyleListProduct.dropdown}
            placeholderStyle={AppStyle.StyleListProduct.placeholderStyle}
            selectedTextStyle={AppStyle.StyleListProduct.selectedTextStyle}
            inputSearchStyle={AppStyle.StyleListProduct.inputSearchStyle}
            iconStyle={AppStyle.StyleListProduct.iconStyle}
            data={stat}
            maxHeight={300}
            labelField="status"
            valueField="id"
            placeholder="Thiết lập trạng thái"
            onChange={(item) => {
              { item.id === 0 ? setStatus(true) : setStatus(false) }
            }}
          />}
        <View style={AppStyle.StyleProfile.items}>
          <FontAwesome5 name="sticky-note" size={20} color="black" />
          {warehouses &&
            <TextInput
              placeholder={warehouses.description}
              keyboardType="default"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />}
        </View>

        <TouchableOpacity
          style={AppStyle.StyleProfile.btn_upload}
          onPress={
            () => pickFromGalary()
          }>
          <Text style={{ color: '#fff', fontSize: 18 }}>Thêm hình ảnh</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={AppStyle.StyleProfile.btn_edit}
          onPress={() => {
            updateWarehouse(wareHouseName, address, idCategorie, currentCapacity, monney, status, description, images);
            { checkUpdate ? navigation.navigate("UpdateWarehouseScreen") : navigation.navigate("HomeNavigation"); }
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
