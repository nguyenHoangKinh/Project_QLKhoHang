import { useContext, useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import AppStyle from '../theme';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from "../context/AuthContext";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import { useRoute } from "@react-navigation/native";

export default function UpdatePostOwner({ navigation }) {
    const { userInfo } = useContext(AuthContext);
    const [post, setPost] = useState();
    // const [idWarehouse, setIdWarehouse] = useState("");
    const [description, setDescription] = useState();
    // const [images, setImages] = useState();
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

    const updatePost = async (description) => {
        axios.put("https://warehouse-management-api.vercel.app/v1/blog/update", {
            description: description,
        },
            {
                headers: {
                    Authorization: `Bearer ${userInfo.accessToken}`,
                    'content-type': 'multipart/form-data',
                },
                params: {
                    id: idPost
                }
            }).then((res) => {
                Alert.alert("Cập nhật mô tả thành công");
                navigation.navigate("ListBlogOwner")
            }).catch((err) => {
                console.log(err)
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
                const formData = new FormData();
                formData.append('images', { uri: result.assets[0].uri, name: 'file.jpg', type: 'image/jpeg' });

                const cloudinaryResponse = await axios.put(
                    `https://warehouse-management-api.vercel.app/v1/blog/update`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${userInfo.accessToken}`,
                        },
                        params: {
                            id: idPost
                        }
                    }
                );

                Alert.alert("Cập nhật hình ảnh thành công");
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
                    onPress={() =>
                        Alert.alert(
                            "",
                            "Bạn có muốn cập nhật hình ảnh không?",
                            [
                                {
                                    text: "Cancel",
                                    style: "cancel",
                                },
                                {
                                    text: "OK", onPress: () => pickFromGalary()
                                },
                            ],
                            { cancelable: false }
                        )
                    }>
                    <Text style={{ color: '#fff', fontSize: 18 }}>Thêm hình ảnh</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={AppStyle.StyleProfile.btn_edit}
                    onPress={() => {
                        (!description)
                            ? showAlert()
                            : updatePost(description, images)
                    }}>

                    <AntDesign name="edit" size={20} color="#fff" />
                    <Text style={{ color: '#fff' }}>CẬP NHẬT MÔ TẢ</Text>
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
