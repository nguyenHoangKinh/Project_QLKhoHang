import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { IconButton } from "react-native-paper";
import { uuid } from "react-native-uuid";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import AppStyle from "../theme";

const TodoScreen = ({ navigation }) => {
  // Init local states
  const [warehouse, setWarehouse] = useState({});
  const [searchWarehouse, setSearchWarehouse] = useState({});
  const { userInfo,logout } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`https://warehouse-management-api.vercel.app/v1/warehouse/list`, {
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
        params: {
          id_owner: userInfo.others._id,
        },
      }).then((res) => {
        let warehouses = res.data;
        setWarehouse(warehouses);
        setSearchWarehouse(warehouses);
      }).catch((e) => {
        console.log(`get warehouse error ${e.res}`);
        if (e.response.data.success === false) {
          alert(e.response.data.message);
          logout()
        }
      });
  }, [warehouse]);

  // Handle Delete
  const handleDeleteTodo = (id) => {
    axios.delete(
        `https://warehouse-management-api.vercel.app/v1/warehouse/deleteWarehouse/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
          },
          params: {
            id_owner: userInfo.others._id,
          },
        }
      ).then((res) => {
        alert("Xóa thành công");
      }).catch((e) => {
        console.log(`delete warehouse error ${e.res}`);
      });
  };

  // Render items
  const renderTodos = ({ item, index }) => {
    return (
      <View style={AppStyle.StyleWarehouse.warehouse_view}>
        <Image
          source={{ uri: `${item.imageWarehouse}` }}
          style={{ height: 50, width: 50, marginRight: 10 }}
        ></Image>
        <TouchableOpacity
          style={AppStyle.StyleWarehouse.name_warehouse}
          onPress={() =>
            navigation.navigate("DetailWarehouseScreem", {
              idWarehouse: item._id,
            })
          }>

          <Text style={AppStyle.StyleWarehouse.tittle_warehouse}>
            Tên Kho Hàng: <></>
            <Text style={AppStyle.StyleWarehouse.name_warehouse}>
              {item.wareHouseName}
            </Text>
          </Text>
          <Text style={AppStyle.StyleWarehouse.tittle_warehouse}>
            Loại kho: <></>
            <Text style={AppStyle.StyleWarehouse.name_warehouse}>
              {item.category.name}
            </Text>
          </Text>
          <Text style={AppStyle.StyleWarehouse.tittle_warehouse}>
            Dung lượng: <></>
            <Text style={AppStyle.StyleWarehouse.name_warehouse}>
              <Text> {item.currentCapacity}</Text><Text>/{item.capacity} {item.category.acreage}</Text>
            </Text>
          </Text>
        </TouchableOpacity>

        <IconButton
          style={{marginLeft: -10}}
          icon="pencil"
          iconColor="#000"
          onPress={() => {
            navigation.navigate("UpdateWarehouseScreen", {
              idWarehouse: item._id,
            });
          }}
        />
        <IconButton
        style={{marginLeft: -15, marginRight: -10}}
          icon="trash-can"
          iconColor="#000"
          onPress={() => handleDeleteTodo(item._id)}
        />
      </View>
    );
  };

  const handleSearch = (text) => {
    if (text) {
      let searchList = warehouse.filter((searchWarehouse) =>
        searchWarehouse.wareHouseName.toLowerCase().includes(text.toLowerCase())
      );

      setSearchWarehouse(searchList);
    } else {
      setSearchWarehouse(warehouse);
    }
  };

  return (
    <View style={{ marginHorizontal: 16, marginTop: 40, marginBottom: 200 }}>
      <TextInput
        style={AppStyle.StyleWarehouse.search}
        placeholder="Tìm kiếm"
        onChangeText={(text) => {
          handleSearch(text);
        }}
      />

      <TouchableOpacity
        style={AppStyle.StyleWarehouse.btn_add}
        onPress={() => navigation.navigate("AddWarehouseScreen")}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
          Thêm Kho Hàng
        </Text>
      </TouchableOpacity>

      {/* Render todo list */}
      <FlatList data={searchWarehouse} renderItem={renderTodos} />
    </View>
  );
};

export default TodoScreen;
