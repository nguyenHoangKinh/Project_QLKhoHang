import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  View,
  Image,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import AppStyle from "../../theme";

export default function ListWareUser({ navigation }) {
  const [warehouse, setWarehouse] = useState({});
  const [check, setCheck] = useState(false);
  const [warehousecateName, setWarehouseCatename] = useState({});
  const [list, setList] = useState({});
  const { userInfo, setListWare, logout } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(
        `https://warehouse-management-api.vercel.app/v1/warehouse/listWarehouseUser`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
          },
        }
      )
      .then((res) => {
        let warehouseUser = res.data.warehouse;
        setList(warehouseUser);
        setWarehouse(warehouseUser);
        console.log(res.data.warehouse.name);
        // console.log(warehouseUser.address);
      })
      .catch((e) => {
        console.log(`get warehouseUser error ${e.res}`);
        if (e.response.data.success === false) {
          alert(e.response.data.message);
          logout();
        }
      });
  }, []);

  const renderTodos = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("DetailWareHouseUser", setListWare(item._id))
          }
        >
          <View style={styles.rowContainer}>
            <Image style={styles.image} source={{ uri: item.owner.avatar }} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>Tên Kho: {item.wareHouseName}</Text>
              <Text style={styles.title}>Dia Chi: {item.address}</Text>
              <Text style={styles.title}>
                Loại kho: {item.category.name}
                {setWarehouseCatename(item.category.name)}
              </Text>
              <Text style={styles.title}>Giá: {item.monney}</Text>
              <Text style={styles.title}>Chủ Kho: {item.owner.username}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.list}>
          <FlatList data={list} renderItem={renderTodos} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchBarContainer: {
    backgroundColor: "#fff",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    paddingHorizontal: 16,
  },
  searchBarInputContainer: {
    backgroundColor: "#e0e0e0",
  },
  list: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "green",
    padding: 16,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    color: "#333",
  },
});
