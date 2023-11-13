import { useContext, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, Image, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import AppStyle from '../theme';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from "../context/AuthContext";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";

export default function AddWarehouseScreen({ navigation }) {
    const { userInfo, splashLoading } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const [wareHouseName, setWareHouseName] = useState();
    const [address, setAddress] = useState();
    const [idCategorie, setIdCategorie] = useState("");
    const [capacity, setCapacity] = useState();
    const [monney, setMonney] = useState();
    const [status, setStatus] = useState();
    const [description, setDescription] = useState();
    const [checkAdd, setCheckAdd] = useState(false);

    useEffect(() => {
        axios
            .get(`https://warehouse-management-api.vercel.app/v1/warehouse/category/list`,
                {
                    headers:
                    {
                        Authorization: `Bearer ${userInfo.accessToken}`
                    },
                })
            .then((res) => {
                let categorie = res.data.categories;
                setCategories(categorie);
            })
            .catch((e) => {
                console.log(`get categories error ${e.res}`);
            });
    }, []);
    const updateWarehouse = (wareHouseName, address, category, capacity, monney, status, description, owner) => {
        axios
            .post(`https://warehouse-management-api.vercel.app/v1/warehouse/create`, {
                wareHouseName: wareHouseName,
                address: address,
                category: category,
                capacity: capacity,
                monney: monney,
                status: status,
                description: description,
                owner: owner,
            }, {
                headers:
                {
                    Authorization: `Bearer ${userInfo.accessToken}`
                },
                params:
                {
                    id_owner: userInfo.others._id
                },
            })
            .then((res) => {
                console.log(res.data);
                setCheckAdd(true)
            })
            .catch((e) => {
                console.log(`Add error ${e}`);
                setCheckAdd(false)
            });
    };

    return (
        <View>
            <ScrollView style={{ marginTop: 50 }}>
                <View style={AppStyle.StyleProfile.items}>
                    <FontAwesome5 name="warehouse" size={20} color="black" />
                    <TextInput
                        placeholder="Nhập tên kho hàng"
                        keyboardType="default"
                        value={wareHouseName}
                        onChangeText={text => setWareHouseName(text)}
                    />
                </View>
                <View style={AppStyle.StyleProfile.items}>
                    <Entypo name="address" size={20} color="black" />
                    <TextInput
                        placeholder="Nhập địa chỉ kho hàng"
                        keyboardType="default"
                        value={address}
                        onChangeText={text => setAddress(text)}
                    />
                </View>
                <Dropdown
                    style={AppStyle.StyleListProduct.dropdown}
                    placeholderStyle={AppStyle.StyleListProduct.placeholderStyle}
                    selectedTextStyle={AppStyle.StyleListProduct.selectedTextStyle}
                    inputSearchStyle={AppStyle.StyleListProduct.inputSearchStyle}
                    iconStyle={AppStyle.StyleListProduct.iconStyle}
                    data={categories}
                    maxHeight={300}
                    labelField="name"
                    valueField="_id"
                    placeholder="Chọn danh mục"
                    searchPlaceholder="Search..."
                    // value={name}
                    onChange={item => {
                        setIdCategorie(item._id);
                    }}
                />
                <View style={AppStyle.StyleProfile.items}>
                    <MaterialIcons name="storage" size={20} color="black" />
                    <TextInput
                        placeholder="Nhập dung tích"
                        keyboardType="default"
                        value={capacity}
                        onChangeText={text => setCapacity(text)}
                    />
                </View>
                <View style={AppStyle.StyleProfile.items}>
                    <FontAwesome name="money" size={20} color="black" /><Text> </Text>
                    <TextInput
                        placeholder="Nhập số tiền"
                        keyboardType="numeric"
                        value={monney}
                        onChangeText={text => setMonney(text)}
                    />
                </View>
                <View style={AppStyle.StyleProfile.items}>
                    <MaterialIcons name="aspect-ratio" size={20} color="black" />
                    <TextInput
                        placeholder="Nhập trạng thái"
                        keyboardType="default"
                        value={status}
                        onChangeText={text => setStatus(text)}
                    />
                </View>
                <View style={AppStyle.StyleProfile.items}>
                    <FontAwesome5 name="sticky-note" size={20} color="black" />
                    <TextInput
                        placeholder="Nhập ghi chú"
                        keyboardType="default"
                        value={description}
                        onChangeText={text => setDescription(text)}
                    />
                </View>
                <View style={AppStyle.StyleProfile.items}>
                    <Entypo name="user" size={20} color="black" />
                    <Text>{userInfo.others.username}</Text>
                </View>
                <TouchableOpacity
                    style={AppStyle.StyleProfile.btn_edit}
                    onPress={() => {
                        updateWarehouse(wareHouseName, address, idCategorie, capacity, monney, status, description, userInfo.others._id)
                        {checkAdd ? navigation.navigate("AddWarehouseScreen") : navigation.navigate("Home")}
                    }}>
                    
                    <AntDesign name="edit" size={20} color="#fff" />
                    <Text style={{ color: '#fff' }}>THÊM KHO HÀNG</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={AppStyle.StyleProfile.btn_logout}
                    onPress={
                        () => navigation.navigate('HomeNavigation')
                    }>
                    <Text style={{ color: '#fff' }}>HỦY</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
