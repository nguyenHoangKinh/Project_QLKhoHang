import { StatusBar } from "expo-status-bar";

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import axios from "axios";
import { BASE_URL_Owners } from "../config";

export default function ListWareHouseUser() {
  const [userInfo, setUserInfo] = useState({});
  const [list, setListWare] = useState([]);
//   const [visible, setViisble] = useState(false);
  constructor= (props) => {
    super(props);
    this.state = {persons: []};
  }

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    axios
      .get(`${BASE_URL_Owners}/warehouse/listWarehouseUser/persons`, {
        //headers: { Authorization: `Token ${userInfo.accessToken}` },
        
      })
      .then((res) => {
        console.log(res.data);
        this.setState({persons: res.data});
       
        // let userInfo = res.data;
        // setUserInfo(userInfo);
        // AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        // console.log(userInfo.accessToken);
        // var response = res.data;
        // setListWare(res.data.warehouse);
        //console.log(res.data.warehouse);

      }).catch((error) => {
        console.log(error);
        // if (error.response && error.response.status === 401 ) {
        //   // Handle 401 Unauthorized error
        //   console.log("Unauthorized error:", error.response.data);
        // } else {
        //   // Handle other errors
        //   console.error("Error:", error);
        // }
      });
  };
  tabRow=()=> {
    return this.state.persons.map(function (object, i) {
        return <TableRow obj={object} key={i}/>;
    });
}

//   const handleVisibleModal = () => {
//     setViisble(!visible);
//   };
  return (
    <SafeAreaView>
      {/* <View style={styles.header_container}>
        <Text style={styles.txt_main}>Course {list && list.length}</Text>
        <TouchableOpacity onPress={handleVisibleModal}>
          <Text style={styles.txt_name}>New Course</Text>
        </TouchableOpacity>
      </View> */}

      <ScrollView>
        {list &&
          list.map((item, index) => {
            return (
              <View style={styles.item_course} key={index}>
                <View >
                    {this.tabRow}
                  
                </View>
                {/* <View>
                    <TouchableOpacity onPress={() => handelDetete(item)}>
                      <Text style={styles.txt_del}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleEdit(item)}>
                      <Text style={styles.txt_edit}>Edit</Text>
                    </TouchableOpacity>
                  </View> */}
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 15,
    // backgroundColor : "#e3e3e3",
    marginTop: 10,
  },

  txtClose: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "right",
  },
  text_input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    marginTop: 10,
  },
  header_container: {
    padding: 15,
    backgroundColor: "#eeeeee",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  txt_main: {
    fontSize: 22,
    fontWeight: "bold",
  },
  item_course: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e2e2",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  txt_name: {
    fontSize: 18,
    marginTop: 5,
    fontWeight: "bold",
  },
  txt_item: {
    fontSize: 14,
    marginTop: 5,
  },
  txt_enabled: {
    fontSize: 14,
    marginTop: 5,
    color: "green",
    fontWeight: "bold",
  },
  txt_disabled: {
    fontSize: 14,
    marginTop: 5,
    color: "yellow",
    fontWeight: "bold",
  },
  txt_del: {
    fontSize: 14,
    marginTop: 5,
    color: "red",
    fontWeight: "bold",
  },
  txt_edit: {
    fontSize: 14,
    marginTop: 5,
    color: "blue",
    fontWeight: "bold",
  },
  btnContainer: {
    display: "flex",
    padding: 20,
    backgroundColor: "#000",
    marginTop: 20,
  },
  textButton: {
    textAlign: "center",
    color: "#FFF",
  },
});
