import { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import st from "../../theme/styles";



const AddWareHouse = () => {
  const [tenKho, settenKho] = useState('');
  const [trangthai, settrangThai] = useState(0);
  // const [diachi, setDiaChi] = useState('');
  // const [gia, setGia] = useState('');
  // const [moTa, setMoTa] = useState('');
  // const [dungTich, setDungTich] = useState('');
  // const [danhMuc, setDanhMuc] = useState('');
  // const [anh, setAnh] = useState('');

  const SaveKho = () => {
    //tao doi tuong du lieu
    let objKho = { name: tenKho, statusKho: trangthai };
    let url_api = "https://651cbef435bd4107e373147b.mockapi.io/Kho";

    fetch(url_api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objKho)
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
      <TextInput style = {st.itemWare}
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
      {/* <TextInput style = {st.itemWare}
        placeholder="địa chỉ"
        onChangeText={(txt) => {
          setDiaChi(txt);
        }}
      />
      <TextInput
        placeholder="danh mục"
        onChangeText={(txt) => {
          setDanhMuc(txt);
        }}
      />
      <TextInput style = {st.itemWare}
        placeholder="dung tích"
        onChangeText={(txt) => {
          setDungTich(txt);
        }}
      />
      <TextInput
        placeholder="Giá"
        onChangeText={(txt) => {
          setGia(txt);
        }}
      />
      <TextInput
        placeholder="Mô tả"
        onChangeText={(txt) => {
          setMoTa(txt);
        }}
      />
      <Image
         placeholder="Ảnh"
         onChangeText={(txt) => {
          setAnh(txt);
        }}
      /> */}
      <Button title="Save" onPress={SaveKho}/>
    </View>
  );
};
export default AddWareHouse;
