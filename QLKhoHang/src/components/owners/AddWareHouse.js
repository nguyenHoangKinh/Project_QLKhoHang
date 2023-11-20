import { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import st from "../../theme/styles";

const AddWareHouse = () => {
  const [tenKho, settenKho] = useState("");
  const [trangthai, settrangThai] = useState(0);

  const SaveKho = () => {
    //tao doi tuong du lieu
    let objKho = { name: tenKho, statusKho: trangthai };
    let url_api = "https://651cbef435bd4107e373147b.mockapi.io/Kho";

    fetch(url_api, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objKho),
    })
      .then((res) => {
        if (res.status == 201) alert("Them Thanh Cong");
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  return (
    <View>
      <Text>Them Kho </Text>
      <TextInput
        style={st.itemWare}
        placeholder="tên"
        onChangeText={(txt) => {
          settenKho(txt);
        }}
      />
      <TextInput
        placeholder="trạng thái"
        onChangeText={(txt) => {
          settrangThai(txt);
        }}
      />
      <Button title="Save" onPress={SaveKho} />
    </View>
  );
};
export default AddWareHouse;
