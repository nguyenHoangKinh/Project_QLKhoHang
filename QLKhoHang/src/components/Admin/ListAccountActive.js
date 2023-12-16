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

const TodoScreen = ({ navigation }) => {
  // Init local states
  const [account, setAccount] = useState({});
  const { userInfo,logout } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(
        `https://warehouse-management-api.vercel.app/v1/admin/list-account-active`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
          },
        }
      )
      .then((res) => {
        let account = res.data.accounts;
        setAccount(account);
      })
      .catch((e) => {
        console.log(`get account error ${e.res}`);
        if (e.response.data.success === false) {
          alert(e.response.data.message);
          logout()
        }
      });
  }, []);

  const acountActive = (id) => {
    axios
      .put(
        `https://warehouse-management-api.vercel.app/v1/admin/deactivate-account?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
          },
        }
      )
      .then((res) => {
        let password = res.data;
        console.log(password.message);
      })
      .catch((e) => {
        console.log(`error ${e.response.data.message}`);
      });
  };

  // Render items
  const renderTodos = ({ item, index }) => {
    return (
      <View style={AppStyle.StyleWarehouse.warehouse_view}>
        <TouchableOpacity
          style={AppStyle.StyleWarehouse.name_warehouse}
          onPress={() =>
            navigation.navigate("DetailAcount", { idWarehouse: item._id })
          }
        >
          <Text style={AppStyle.StyleWarehouse.tittle_warehouse}>
            Tên Tài Khoản: <></>
            <Text style={AppStyle.StyleWarehouse.name_warehouse}>
              {item.username}
            </Text>
          </Text>
          <Text style={AppStyle.StyleWarehouse.tittle_warehouse}>
            Email: <></>
            <Text style={AppStyle.StyleWarehouse.name_warehouse}>
              {item.email}
            </Text>
          </Text>
        </TouchableOpacity>

        <IconButton
          icon="pencil"
          iconColor="#fff"
          onPress={() => {
            acountActive(item._id);
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
      <FlatList
        data={account}
        renderItem={renderTodos}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

export default TodoScreen;
