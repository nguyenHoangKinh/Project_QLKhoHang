import { useContext, useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import AppStyle from '../theme';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from "../context/AuthContext";
import { Dropdown } from "react-native-element-dropdown";
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import axios from "axios";
import { useRoute } from "@react-navigation/native";

export default function UpdatePostOwner({ navigation }) {
    const { userInfo } = useContext(AuthContext);
    const [post, setPost] = useState();
    const [idWarehouse, setIdWarehouse] = useState("");
    const [description, setDescription] = useState();
    const [images, setImages] = useState();
    const route = useRoute();
    const idPost = route.params?.idPost;

    useEffect(() => {
        axios.get(`https://warehouse-management-api.vercel.app/v1/blog/get-by-id`, {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
            params: {
                id: idPost,
            },
        }).then((res) => {
            let post = res.data.data;
            setPost(post);
        }).catch((e) => {
            console.log(`Get post error ${e.res}`);
        });
    }, []);

    const showAlert = () =>
        Alert.alert(
            'Sửa thất bại',
            'Yêu cầu nhập đầy đủ thông tin cần sửa',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
        );

    const addPost = (description, images) => {
        const formData = new FormData();

        // for (let i = 0; i < images.length; i++) {
        //     formData.append("images", images[i].images);
        // }

        formData.append("description", description)
        axios.put("https://warehouse-management-api.vercel.app/v1//blog/update", {
                description: description,
                images: images
            },
            {
                headers: {
                    Authorization: `Bearer ${userInfo.accessToken}`
                },
                params: {
                    id: idPost
                }
            }).then((res) => {
                Alert.alert("Cập nhật bài viết thành công");
                navigation.navigate("ListBlogOwner")
            }).catch((err) => {
                console.log(err)
            });
    };

    const pickFromGalary = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status) {
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5,
                base64: true
            });

            console.log(data.assets)

            if (!data.canceled) {
                let newFile = {
                    uri: data.assets[0].uri,
                    type: data.assets[0].type,
                    name: data.assets[0].name,
                };
                setImages(data.assets.base64);
            }
        } else { Alert.alert('Chưa chọn hình ảnh'); }
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

                <Text style={{ marginLeft: 20, fontSize: 20, fontWeight: "bold" }}>Tên bài viết</Text>
                <View style={AppStyle.StyleProfile.items}>
                    {post &&
                    <Text>{post.warehouse.wareHouseName}</Text>}
                </View>

                <Text style={{ marginLeft: 20, fontSize: 20, fontWeight: "bold" }}>Mô tả</Text>
                <View style={AppStyle.StyleProfile.items}>
                    {post &&
                    <TextInput
                        placeholder={post.description}
                        keyboardType="default"
                        value={description}
                        onChangeText={text => setDescription(text)}
                        style={{ height: 300 }}
                    />}
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
                        (!description && !images)
                            ? showAlert()
                            : addPost(description, images)
                    }}>

                    <AntDesign name="edit" size={20} color="#fff" />
                    <Text style={{ color: '#fff' }}>SỬA BÀI VIẾT</Text>
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
