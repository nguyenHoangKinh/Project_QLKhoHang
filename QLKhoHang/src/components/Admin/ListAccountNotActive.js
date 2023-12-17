import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { IconButton } from "react-native-paper";
import { uuid } from "react-native-uuid";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import AppStyle from "../../theme";
import CheckboxItem from "../Item/CheckboxItem";
import { CheckBox } from "react-native-elements";

const TodoScreen = ({ navigation }) => {
  // Init local states
  const { userInfo,logout, ListAccOwnersDe, accountde, setAccountDe } = useContext(AuthContext);

  useEffect(() => {
    ListAccOwnersDe()
  }, []);
// console.log(">>>>>>>>>>>>>>>>>>>>>>>>>",account);
  const acountDeActive = (id) => {
    axios
      .put(
        `https://warehouse-management-api.vercel.app/v1/admin/activate-account?id=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
          },
        }
      )
      .then((res) => {
        let password = res.data;
        //alert('Active tai khoan chu kho thanh cong');
        ListAccOwnersDe();
        console.log(password.message);
      })
      .catch((e) => {
        console.log(`error ${e.response.data.message}`);
      });
  };

  const submitNAcount = () => {
    const selectedIds = accountde
      .filter((item) => item.selected)
      .map((item) => item._id);

    axios
      .put(
        `https://warehouse-management-api.vercel.app/v1/admin/activate-multiple-accounts`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
          },
          params: {
            id: selectedIds,
          },
        }
      )
      .then((res) => {
        //alert("Activate nhieu tai khoan thanh cong");
        ListAccOwnersDe();
      })
      .catch((e) => {
        console.log(`error ${e.response.data.message}`);
      });
  };

  const handleCheckboxPress = (id) => {
    setAccountDe((prevData) => {
      return prevData.map((item) =>
        item._id === id
          ? { ...item, selected: !item.selected }
          : item
      );
    });
  };

  // Render items
  const renderTodos = ({ item }) => {
    return (
      <View style={AppStyle.StyleWarehouse.warehouse_view}>
        {/* ... (Your other UI elements) */}
        <TouchableOpacity
          style={AppStyle.StyleWarehouse.name_warehouse}
          onPress={() =>
            navigation.navigate("DetailAcount", { idWarehouse: item._id })
          }
        >
          <Text style={AppStyle.StyleWarehouse.tittle_warehouse}>
            Tên Tài Khoản:
            <Text style={AppStyle.StyleWarehouse.name_warehouse}>
              {item.username}
            </Text>
          </Text>
          <Text style={AppStyle.StyleWarehouse.tittle_warehouse}>
            Email:
            <Text style={AppStyle.StyleWarehouse.name_warehouse}>
              {item.email}
            </Text>
          </Text>
          <Text style={AppStyle.StyleWarehouse.tittle_warehouse}>
            Phone:
            <Text style={AppStyle.StyleWarehouse.name_warehouse}>
              {item.phone}
            </Text>
          </Text>
        </TouchableOpacity>

        <CheckBox
          checked={item.selected || false}
          onPress={() => handleCheckboxPress(item._id)}
        />

        <IconButton
          icon="pencil"
          iconColor="#fff"
          onPress={() => {
            acountDeActive(item._id);
          }}
        />
      </View>
    );
  };

  //   const handleSearch = (text) => {
  //     if (text) {
  //       let searchList = warehouse.filter((searchWarehouse) =>
  //         searchWarehouse.wareHouseName.toLowerCase().includes(text.toLowerCase())
  //       );

  //       setSearchWarehouse(searchList)
  //     } else {
  //       setSearchWarehouse(warehouse)
  //     }
  //   }

  return (
    <View style={{ marginHorizontal: 16, marginTop: 40, marginBottom: 60 }}>
      <TextInput
        style={AppStyle.StyleWarehouse.search}
        placeholder="Tìm kiếm"
        // value={userInput}
        // onChangeText={(text) => {
        //   handleSearch(text);
        // }}
      />
      <></>
      {/* Render todo list */}
      <IconButton
        icon="pencil"
        iconColor="black"
        onPress={() => submitNAcount()}
      />
      <FlatList
        data={accountde}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderTodos}
      />
    </View>
  );
};

export default TodoScreen;
