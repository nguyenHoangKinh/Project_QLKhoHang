import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  View,
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
  const { userInfo, setListWare,logout } = useContext(AuthContext);
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
          logout()
        }
      });
  }, []);


  const handleSearchCate = (text) => {
    if (text) {
      let searchList = warehouse.filter((searchWarehouse) =>
        searchWarehouse.category.name.toLowerCase().includes(text.toLowerCase())
      );

      setList(searchList);
      setCheck(false);
    } else {
      setList(warehouse);
      setCheck(false);
    }
  };

  // Render todo
  const renderTodos = ({ item, index }) => {
    return (
      <View style={AppStyle.StyleWarehouse.warehouse_view}>
        <TouchableOpacity
          style={AppStyle.StyleWarehouse.name_warehouse}
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
    <View>
      <View className=" h-1/6 ">
        <TextInput
          className="top-16"
          style={AppStyle.StyleWarehouse.search}
          placeholder="Tìm kiếm"
          // value={userInput}
          onChangeText={(text) => {
            //handleSearch(text);
            handleSearchCate(text);
          }}
        />
      </View>
      <View className=" h-5/6 ">
        <View className="m-5">
          <FlatList data={list} renderItem={renderTodos} />
        </View>
      </View>
    </View>
  );
}
