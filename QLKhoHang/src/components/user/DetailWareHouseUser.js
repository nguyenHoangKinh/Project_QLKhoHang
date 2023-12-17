import { useContext, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, Image, TouchableOpacity, View } from "react-native";
import AppStyle from "../../theme";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { FlatList } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { StyleSheet } from "react-native";

const DetailWarehouseScreen = ({ navigation }) => {
  const { userInfo, splashLoading, list } = useContext(AuthContext);
  const [warehouses, setWarehouse] = useState();
  //const [categories, setCategories] = useState([]);
  const route = useRoute();
  // const idWarehouse = route.params?.idWarehouse;
  console.log(list);
  // console.log(userInfo.accessToken);

  useEffect(() => {
    axios
      .get(
        `https://warehouse-management-api.vercel.app/v1/warehouse/getAWarehouse`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
          },
          params: {
            id: list,
          },
        }
      )
      .then((res) => {
        let warehouseUser = res.data.warehouse;
        setWarehouse(warehouseUser);
        console.log(res.data.warehouse);
      })
      .catch((e) => {
        console.log(`get warehouseUser error ${e.res}`);
      });
  }, []);

  return (
    <>
    
    <View>
      <ScrollView style={{ marginTop: 50 }}>
        {warehouses && (
          <>
            <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: warehouses.imageWarehouse }}
              />
               <Text style={styles.title}>
                  Chủ Kho: {warehouses.owner.username}
                </Text>
                <Text style={styles.title}>
                  Eamil: {warehouses.owner.email}
                </Text>
                <Text style={styles.title}>
                  Phone: {warehouses.owner.phone}
                </Text>
              <View style={styles.detailContainer}>
                <Text style={styles.title}>
                  <FontAwesome5 name="warehouse" size={20} color="black" />
                  Tên Kho: {warehouses.wareHouseName}
                </Text>
                <Text style={styles.title}>
                  <Entypo name="address" size={20} color="black" />
                  Địa Chỉ: {warehouses.address}
                </Text>
                <Text style={styles.title}>
                  <MaterialIcons name="category" size={20} color="black" />
                  Loại kho: {warehouses.category.name}
                </Text>
                <Text style={styles.title}>
                  <FontAwesome name="money" size={20} color="black" />
                  Giá: {warehouses.monney}
                </Text>
               
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
    <View style={styles.buttonContainer}>
    <TouchableOpacity
      style={styles.button}
      onPress={() =>
        navigation.navigate("RentAWareHouse", {
          id_warehouse: warehouses._id,
        })
      }
    >
      <Text style={{ color: "#fff" }}>Thuê Kho</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("HomeNavigationUser")}
    >
      <Text style={{ color: "#fff" }}>Quay lại</Text>
    </TouchableOpacity>
  </View>
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
    paddingTop: 50, // Duy trì khoảng trống trên cùng của màn hình
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 50,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    color: "#333",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 16,
  },
});

export default DetailWarehouseScreen;
