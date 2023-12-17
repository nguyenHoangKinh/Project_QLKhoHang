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
  // const [warehousecateName, setWarehouseCatename] = useState({});
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
        // console.log(res.data.warehouse.name);
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
          <Text style={AppStyle.StyleWarehouse.tittle_warehouse}>
            Tên Kho Hàng: <></>
            <Text style={AppStyle.StyleWarehouse.name_warehouse}>
              {item.wareHouseName}
            </Text>
          </Text>
          <Text style={AppStyle.StyleWarehouse.tittle_warehouse}>
            Dia Chi: <></>
            <Text style={AppStyle.StyleWarehouse.name_warehouse}>
              {item.address}
            </Text>
          </Text>
          <Text style={AppStyle.StyleWarehouse.tittle_warehouse}>
            Loại kho: <></>
            <Text style={AppStyle.StyleWarehouse.name_warehouse}>
              {item.category.name}
              {/* {setWarehouseCatename(item.category.name)} */}
            </Text>
          </Text>
          <Text style={AppStyle.StyleWarehouse.tittle_warehouse}>
            Giá: <></>
            <Text style={AppStyle.StyleWarehouse.name_warehouse}>
              {item.monney}
            </Text>
          </Text>
          <Text style={AppStyle.StyleWarehouse.tittle_warehouse}>
            Chủ Kho: <></>
            <Text style={AppStyle.StyleWarehouse.name_warehouse}>
              {item.owner.username}
            </Text>
          </Text>
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
