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
// import AppStyle from "../../theme";

import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import AppStyle from "../../theme";
import StyleListWareHouse from "../../theme/StyleListWareHouse";

// // console.log(Date.now().toString());
// export default function ListWareUser() {

// }

// const ListWareUser = ({navigation}) => {
//   // Init local states

// };

export default function ListWareUser() {
  const [list, setList] = useState({});
  const { userInfo } = useContext(AuthContext);

  //   console.log(userInfo.accessToken)

  useEffect(() => {
    axios
      .get(
        `https://warehouse-management-api.vercel.app/v1/warehouse/listWarehouseUser`,
        {
          headers: {
            Authorization: `Token ${userInfo.accessToken}`,
          },
        }
      )
      .then((res) => {
        //console.log(warehouses)
        let warehouseUser = res.data.warehouse;
        setList(warehouseUser);
        console.log(res.data.warehouse);
      })
      .catch((e) => {
        console.log(`get warehouseUser error ${e.res}`);
        //console.log(e);
      });
  }, []);

  // Render todo
  const renderTodos = ({ item, index }) => {
    return (
      //   <View style={StyleListWareHouse.container}>
      //     <Text style={StyleListWareHouse.nameProduct}>Tên:
      //       {item.wareHouseName}
      //     </Text>
      //     <Text style={StyleListWareHouse.nameProduct}>
      //       Địa chỉ:{item.address}
      //     </Text>
      //     <Text style={StyleListWareHouse.nameProduct}>
      //       Danh mục{item.category}
      //     </Text>
      //     <Text style={StyleListWareHouse.nameProduct}>
      //       Giá:{item.monney}
      //     </Text>
      //     <Text style={StyleListWareHouse.nameProduct}>
      //         Chủ kho:
      //       {item.owner}
      //     </Text>
      //   </View>
      <Pressable>
        <View style={AppStyle.StyleOderList.item}>
          <View style={AppStyle.StyleOderList.rightItem}>
            {/* <View className="flex flex-row justify-between"> */}
                <View>
                <Text style={AppStyle.StyleOderList.text}>
              Tên:
              {item.wareHouseName} -
              Địa chỉ:{item.address}
            </Text>
            <Text style={AppStyle.StyleOderList.text}>
              Danh mục{item.category}, Gia{item.monney}
            </Text>
            <Text style={AppStyle.StyleOderList.text}>
              Chủ kho:
              {item.owner}
            </Text>
                </View>
                {/* <View>
                <Text style={AppStyle.StyleOderList.text}>
              Tên:
              {item.wareHouseName}
            </Text>
                </View> */}
            {/* </View> */}
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <View style={{ marginHorizontal: 16, marginTop: 40 }}>
      {/* Render todo list */}

      <FlatList data={list} renderItem={renderTodos} />
    </View>
  );
}

const styles = StyleSheet.create({});
