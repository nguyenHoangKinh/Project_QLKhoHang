import { View, Text, TextInput, Button } from "react-native";
import { useState } from "react";
import st  from "../../theme/styles";

const UpdateWareHouse = (props) => {
    const [tenKho, settenKho] = useState( props.route.params.item_ck.name);
    const [trangthai, settrangThai] = useState(props.route.params.item_ck.price);
    // const [diachi, setDiaChi] = useState( props.route.params.item_ck.addres);
    // const [danhMuc, setDanhMuc] = useState(props.route.params.item_ck.category);
    // const [gia, setGia] = useState( props.route.params.item_ck.price);
    // const [dungTich, setDungTich] = useState(props.route.params.item_ck.capacity);
    // const [moTa, setMoTa] = useState(props.route.params.item_ck.description);


    const SaveWareHouse = () => {
        // tạo đối tượng dữ liệu
        let _id = props.route.params.item_ck.id;
        let objSP = { name: tenKho, statusKho: trangthai };
        let url_api = 'https://651cbef435bd4107e373147b.mockapi.io/Kho/'+_id;

        fetch(url_api, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objSP)
        })
            .then((res) => {
                if (res.status == 200)
                    alert("Sửa thành công")
            })
            .catch((ex) => {
                console.log(ex);
            });

    }


    return (
        <View>
            <TextInput placeholder="Tên Kho"
                onChangeText={(txt) => { settenKho(txt) }}
                value={tenKho}
                />
            <TextInput placeholder="Trang Thai"
                onChangeText={(txt) => { settrangThai(txt) } }
                value={trangthai}
            />
             {/* <TextInput placeholder="Dia chi"
                onChangeText={(txt) => { setDiaChi(txt) } }
                value={diachi}
            />
             <TextInput placeholder="Danh muc"
                onChangeText={(txt) => { setDanhMuc(txt) } }
                value={danhMuc}
            />
             <TextInput placeholder="Dung tich"
                onChangeText={(txt) => { setDungTich(txt) } }
                value={dungTich}
            />
             <TextInput placeholder="Gia"
                onChangeText={(txt) => { setGia(txt) } }
                value={gia}
            />
             <TextInput placeholder="Mo Ta"
                onChangeText={(txt) => { setMoTa(txt) } }
                value={moTa}
            />
            <Button title="Save" onPress={SaveWareHouse} />
            */}
        </View> 

    );
}
export default UpdateWareHouse;