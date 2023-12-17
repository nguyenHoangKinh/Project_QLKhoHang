import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { IconButton } from "react-native-paper";
import { uuid } from "react-native-uuid";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import AppStyle from "../../theme";
import CheckboxItem from "../Item/CheckboxItem";
import { CheckBox } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const TodoScreen = ({ navigation }) => {
  // Init local states
  const { userInfo, logout, ListAccOwners, account, setAccount } =
    useContext(AuthContext);
  //console.log(account)
  const [allIds, setAllIds] = useState([]);
  const [isCheck, setIsCheck] = useState(false);

  useEffect(() => {
    ListAccOwners();
  }, []);

  useEffect(() => {
    setAllIds(account.map(item => ({ ...item, selected: false })));
  }, [account]);
  // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>",account);
  const acountDeActive = (id) => {
    axios
      .put(
        `https://warehouse-management-api.vercel.app/v1/admin/deactivate-account?id=${id}`,
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
        ListAccOwners();
        console.log(password.message);
      })
      .catch((e) => {
        console.log(`error ${e.response.data.message}`);
      });
  };

  const submitNAcount = () => {
    const selectedIds = account
      .filter((item) => item.selected)
      .map((item) => item._id);

    axios
      .put(
        `https://warehouse-management-api.vercel.app/v1/admin/deactivate-multiple-accounts`,
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
        //alert("Deactivate nhieu tai khoan thanh cong");
        ListAccOwners();
      })
      .catch((e) => {
        console.log(`error ${e.response.data.message}`);
      });
  };

  const handleCheckboxPress = (id) => {
    setAccount((prevAccount) => {
      return prevAccount.map((item) =>
        item._id === id ? { ...item, selected: !item.selected } : item
      );
    });
  };

  const renderTodos = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("DetailAcount", { idWarehouse: item._id })
          }
        >
          <View style={styles.rowContainer}>
            <Image source={{ uri: item.avatar }} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={AppStyle.StyleWarehouse.tittle_warehouse}>
                <FontAwesome5 name="user" size={20} color="black" />:
                <Text style={styles.title}>{item.username}</Text>
              </Text>
              <Text style={AppStyle.StyleWarehouse.tittle_warehouse}>
                <MaterialIcons name="email" size={20} color="black" />:
                <Text style={AppStyle.StyleWarehouse.name_warehouse}>
                  {item.email}
                </Text>
              </Text>
              <Text style={AppStyle.StyleWarehouse.tittle_warehouse}>
                <FontAwesome5 name="phone" size={20} color="black" />:
                <Text style={AppStyle.StyleWarehouse.name_warehouse}>
                  {item.phone}
                </Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={!!item.selected} // Đảm bảo giá trị luôn là boolean
            onPress={() => handleCheckboxPress(item._id)}
          />
          <IconButton
            icon="pencil"
            iconColor="black"
            onPress={() => {
              acountDeActive(item._id);
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <IconButton
        icon="pencil"
        iconColor="black"
        onPress={() => submitNAcount()}
      />
      <FlatList
        data={account}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderTodos}
      />
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    padding: 16,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    padding: 16,
    marginBottom: 8,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    color: "#333",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
});
