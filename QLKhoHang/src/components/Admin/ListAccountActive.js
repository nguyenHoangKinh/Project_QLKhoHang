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
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
const TodoScreen = ({ navigation }) => {
  // Init local states
  const { userInfo, logout, ListAccOwners, account, setAccount } =
    useContext(AuthContext);
  //console.log(account)
  // const [allIds, setAllIds] = useState([]);
  // const [isCheck, setIsCheck] = useState(false)

  useEffect(() => {
    ListAccOwners();
  }, []);
  // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>",account);
  const acountActive = (id) => {
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

  // const handleChange = (id) =>{
  //   if(id){
  //       setAllIds([...allIds,id])
  //   }
  // }
  // console.log(allIds);

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
    setAccount((prevData) => {
      return prevData.map((item) =>
        item._id === id ? { ...item, selected: !item.selected } : item
      );
    });
  };
  //console.log(account);

  // Render items
  const renderTodos = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        {/* ... (Your other UI elements) */}
        <TouchableOpacity
          //style={AppStyle.StyleWarehouse.name_warehouse}
          onPress={() =>
            navigation.navigate("DetailAcount", { idWarehouse: item._id })
          }
        >
          <View style={{ flex: 5 }}>
            <Text style={AppStyle.StyleWarehouse.tittle_warehouse}>
              <FontAwesome5 name="user" size={20} color="black" />: 
              <Text style={styles.title}>
                {item.username}
              </Text>
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
        </TouchableOpacity>
        <View>
          <CheckBox
            checked={item.selected || false}
            onPress={() => handleCheckboxPress(item._id)}
          />

          <IconButton
            icon="pencil"
            iconColor="#fff"
            onPress={() => {
              acountActive(item._id);
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={AppStyle.StyleWarehouse.search}
        placeholder="Tìm kiếm"
        // value={userInput}
        // onChangeText={(text) => {
        //   handleSearch(text);
        // }}
      />
      {/* <IconButton
        icon="pencil"
        iconColor="black"
        onPress={() => {
          submitNAcount(item);
        }}
      /> */}
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

      {/* Render todo list */}
      {/* {account.length === 0 ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={account}
          //keyExtractor={(item) => item.item.id.toString()}
          renderItem={renderTodos}
        />
      )} */}
      {/* <FlatList
        data={account}
        renderItem={(item, index) => renderTodos(item)}
        style={{ marginTop: 20 }}
      /> */}
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 16,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
});
