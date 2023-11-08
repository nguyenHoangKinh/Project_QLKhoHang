import { View, Text, Button, FlatList, ActivityIndicator, SafeAreaView, TextInput, } from "react-native";
import React, { useState, useEffect } from "react";
import st from "../theme/styles";
import axios from "axios";
import { BASE_URL_Owners } from "../../config";

const ListWareHouse = (props) => {
    
  const [search, setSearch] = useState("");
  const [masterDataSource, setMasterDataSource] = useState([]);
  //ham tim kiem
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update listWareHouse
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setlistWareHouse(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update listWareHouse with masterDataSource
      setlistWareHouse(masterDataSource);
      setSearch(text);
    }
  };
  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={st.itemStyle} onPress={() => getItem(item)}>
        {item.id}
        {"."}
        {item.name.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert("Id : " + item.id + " Title : " + item.name);
  };

  //const {Logout} = useContext(UserContext);
  let Token = localStorage.getItem("jsonwebtoken");
  let idUser= jwtDecode(Token)

  const [isLoading, setisLoading] = useState(true);
  const [listWareHouse, setlistWareHouse] = useState([]);

  //const axios = require('axios');

  // viet ham load sp

//   const getListWare = async () => {
//     let url_api = "https://651cbef435bd4107e373147b.mockapi.io/Kho";

//     try {
//       const response = await fetch(url_api); // load du lieu

//       const json = await response.json(); // chuyen du lieu thanh json

//       setlistWareHouse(json); // do du lieu vao state
//     } catch (error) {
//       console.error(error);
//     } finally {
//       // ket thuc qua trinh load du lieu va xu li loi
//       setisLoading(false); //trang thai ko con load nua
//     }
//   };
  const renderWareHouse = ({ item }) => {
    //chuc nang xoa
    const xoaKho = () => {
      // link xóa
      const conf = window.confirm("Ban co chac la xoa khong?");
      if (conf) {
        axios
          .delete(
            BASE_URL+"/warehouse/deleteWarehouse/" +
              id,
            {
              headers: {
                Authorization: `Token ${Token}` 
              },
              params: {
                id_owner: idUser.id
              }
            }
          )
          .then((res) => {
            alert("xoa thanh cong");
            window.location.href="/listWareHouse"
            console.log(res);
          })
          .catch((err) => console.log(err));
      }
      
    };
    return (
      <View style={st.itemWare}>
        <Text>
          Ten: {item.wareHoseName}, Dia chi: {item.address}, Danh muc: {item.category},
          Dung tich: {item.capacity}, Gia tien: {item.monney}, 
          TrangThai: {item.status}, Mo ta:{item.description}
        </Text>
        <Button title="xoa" onPress={xoaKho} />
        <Button
          title="Sửa"
          onPress={() => {
            props.navigation.navigate("UpdateWareHouse", { item_ck: item });
          }}
        />
      </View>
    );
  };
  React.useEffect(
    () => {
      axios.get(BASE_URL_Owners+`/warehouse/list`),{
        headers: { 
            Authorization: `Token ${Token}` 
          },
          params: {
            id_owner: idUser.id
          }
      }
      .then((res) => {
        //setColumns(Object, res.data);
        setlistWareHouse(res.data.warehouses.warehouses);
        console.log(res.data.warehouses.warehouses);
      });
      
    //   const unsubscribe = props.navigation.addListener("focus", () => {
    //     // cap nhat giao dien o day
    //   });

    //   return unsubscribe;
    },
    // [props.navigation],
    []
  );

  return (
    <View style={st.khunglistWareHouse}>
      <SafeAreaView>
        <>
          <TextInput
            style={st.textInputStyle}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search Here"
          />
          <FlatList
            data={listWareHouse}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            //renderItem={ItemView}
          />
        </>
      </SafeAreaView>
      {/* <Button
        title="Cac Kho Dang Hoat Dong"
        onPress={() => {
          props.navigation.navigate("ListOnWareHouse");
        }}
      ></Button> */}
      {/* <Button
        title="Them Kho Moi"
        onPress={() => {
          props.navigation.navigate("ManHinhThem");
        }}
      ></Button> */}
      {/* <Button
        title="Phan Khu Kho"
        onPress={() => {
          props.navigation.navigate("PhanKhuKho");
        }}
      ></Button> */}
      <Text>Danh Sach Cac Kho</Text>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={listWareHouse}
          keyExtractor={(item_ck) => {
            return item_ck.id;
          }}
          renderItem={renderWareHouse}
        />
      )}
    </View>
  );
};
export default ListWareHouse;
