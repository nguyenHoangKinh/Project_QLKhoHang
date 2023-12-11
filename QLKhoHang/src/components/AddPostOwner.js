import { useContext, useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import AppStyle from '../theme';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from "../context/AuthContext";
import { Dropdown } from "react-native-element-dropdown";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import axios from "axios";

export default function AddPostOwner({ navigation }) {
    const { userInfo } = useContext(AuthContext);
    const [warehouse, setWarehouse] = useState([]);
    const [idWarehouse, setIdWarehouse] = useState("");
    const [description, setDescription] = useState();
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get(`https://warehouse-management-api.vercel.app/v1/warehouse/list`, {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
            params: {
                id_owner: userInfo.others._id,
            },
        }).then((res) => {
            let warehouses = res.data;
            setWarehouse(warehouses);
        }).catch((e) => {
            console.log(`get warehouse error ${e.res}`);
        });
    }, []);

    const showAlert = () =>
        Alert.alert(
            'Thêm thất bại',
            'Yêu cầu nhập đầy đủ thông tin cần thêm',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
        );
        
    const addPost = (description, images) => {
        const formData = new FormData();
        
        if (images) {
            formData.append('images', { uri: images.assets[0].uri, name: 'file.jpg', type: 'image/jpeg' });
        }

        axios.post(`https://warehouse-management-api.vercel.app/v1/blog/create`, {
            description: description,
            formData,
        }, {
            headers:
            {
                Authorization: `Bearer ${userInfo.accessToken}`,
                'Content-Type': 'multipart/form-data'
            },
            params:
            {
                warehouse: idWarehouse
            },
        }).then((res) => {
            navigation.navigate("ListBlogOwner")
        }).catch((e) => {
            console.log(`Add error ${e.message}`);
        });
    };

    const pickFromGalary = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                setImages(result)
                // const formData = new FormData();
                // formData.append('images', { uri: result.assets[0].uri, name: 'file.jpg', type: 'image/jpeg' });

                // const cloudinaryResponse = await axios.put(
                //     `https://warehouse-management-api.vercel.app/v1/blog/update`,
                //     formData,
                //     {
                //         headers: {
                //             'Content-Type': 'multipart/form-data',
                //             Authorization: `Bearer ${userInfo.accessToken}`,
                //         },
                //         params: {
                //             id: idPost
                //         }
                //     }
                // );

                // Alert.alert("Cập nhật hình ảnh thành công");
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }

    return (
        <View>
            <ScrollView style={{ marginTop: 50 }}>
                <View style={AppStyle.StyleProfile.items}>
                    <Entypo name="user" size={20} color="black" />
                    <Text> {userInfo.others.username}</Text>
                </View>
                <View style={AppStyle.StyleProfile.items}>
                    <Entypo name="email" size={20} color="black" />
                    <Text> {userInfo.others.email}</Text>
                </View>
                <Dropdown
                    style={AppStyle.StyleListProduct.dropdown}
                    placeholderStyle={AppStyle.StyleListProduct.placeholderStyle}
                    selectedTextStyle={AppStyle.StyleListProduct.selectedTextStyle}
                    inputSearchStyle={AppStyle.StyleListProduct.inputSearchStyle}
                    iconStyle={AppStyle.StyleListProduct.iconStyle}
                    data={warehouse}
                    maxHeight={300}
                    labelField="wareHouseName"
                    valueField="_id"
                    placeholder="Chọn kho hàng"
                    searchPlaceholder="Search..."
                    // value={userInfo.others.warehouses}
                    onChange={item => {
                        setIdWarehouse(item._id);
                    }}
                />
                <Text style={{ marginLeft: 20, fontSize: 20, fontWeight: "bold" }}>Mô tả</Text>
                <View style={AppStyle.StyleProfile.items}>
                    <TextInput
                        placeholder=" Nhập mô tả bài viết"
                        keyboardType="default"
                        value={description}
                        onChangeText={text => setDescription(text)}
                        style={{ height: 300 }}
                    />
                </View>

                <TouchableOpacity
                    style={AppStyle.StyleProfile.btn_upload}
                    onPress={
                        () => pickFromGalary()
                    }>
                    <Text style={{ color: '#fff', fontSize: 18 }}>Thêm hình ảnh</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={AppStyle.StyleProfile.btn_edit}
                    onPress={() => {
                        (!description && !idWarehouse)
                            ? showAlert()
                            : addPost(description, images)
                    }}>

                    <AntDesign name="edit" size={20} color="#fff" />
                    <Text style={{ color: '#fff' }}>THÊM BÀI VIẾT</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={AppStyle.StyleProfile.btn_logout}
                    onPress={
                        () => navigation.navigate('ListBlogOwner')
                    }>
                    <Text style={{ color: '#fff' }}>HỦY</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
