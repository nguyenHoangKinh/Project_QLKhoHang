import { View, Text, TextInput, Button } from "react-native";
import { useState } from "react";
import st from "../../theme/styles";

const UpdateWareHouse = (props) => {
  const [tenKho, settenKho] = useState(props.route.params.item_ck.name);
  const [trangthai, settrangThai] = useState(props.route.params.item_ck.price);

  const SaveWareHouse = () => {
    // tạo đối tượng dữ liệu
    let _id = props.route.params.item_ck.id;
    let objSP = { name: tenKho, statusKho: trangthai };
    let url_api = "https://651cbef435bd4107e373147b.mockapi.io/Kho/" + _id;

    fetch(url_api, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objSP),
    })
      .then((res) => {
        if (res.status == 200) alert("Sửa thành công");
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Tên Kho"
        onChangeText={(txt) => {
          settenKho(txt);
        }}
        value={tenKho}
      />
      <TextInput
        placeholder="Trang Thai"
        onChangeText={(txt) => {
          settrangThai(txt);
        }}
        value={trangthai}
      />
    </View>
  );
};
export default UpdateWareHouse;
