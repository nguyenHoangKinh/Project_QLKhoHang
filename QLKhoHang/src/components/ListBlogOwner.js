import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FlatList, Pressable, StyleSheet, Text, Image, TouchableOpacity, View, Alert } from "react-native";
import { AntDesign, Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import AppStyle from "../theme";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

const ListBlogPost = ({ navigation }) => {
    const { userInfo } = useContext(AuthContext);
    const [blog, setBlog] = useState({});

    useEffect(() => {
        axios.get(`https://warehouse-management-api.vercel.app/v1/blog/list-by-owner`, {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
            params: {
                id: userInfo.others._id,
            },
        }).then((res) => {
            let blog = res.data.data;
            setBlog(blog);
        }).catch((e) => {
            console.log(`get blog error ${e.res}`);
        });
    }, [blog]);

    const DeleteBlogOwner = (idBlog) => {
        axios.delete(`https://warehouse-management-api.vercel.app/v1/blog/delete-blog/${idBlog}/`, {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`
            },
            params: {
                id_owner: userInfo.others._id
            }
        }).then((res) => {
            Alert.alert("Xóa thành công")
        }).catch((error) => {
            console.log(error.message);
        });
    }

    const FlatListBlog = (item) => {
        return (
            <View className="ml-2 mr-2">
                <TouchableOpacity
                    className=" border-2 border-indigo-500 rounded"
                    style={AppStyle.StyleListBlogOwner.container}
                    onPress={() => navigation.navigate("UpdateBlog")}>

                    {item.images != "" ? (
                        <View className="pb-0.5">
                            <Image
                                source={{
                                    uri: `${item.images[0]}`,
                                }}
                                style={AppStyle.StyleListBlogOwner.image}
                            />
                        </View>
                    ) : (
                        ""
                    )}
                    <View className="border-2 border-indigo-500  border-t-indigo-500">
                        <View className="p-2">
                            <Text style={AppStyle.StyleListBlogOwner.title}>{item.warehouse.wareHouseName}</Text>
                        </View>
                        <View className="flex p-2">
                            <Text style={AppStyle.StyleListBlogOwner.money}>Giá: {item.warehouse.monney} VND</Text>
                            <Text className="pt-1">Diện tích: {item.warehouse.capacity}</Text>
                            <View className="flex-row pt-1">
                                <TouchableOpacity>
                                    <FontAwesome5 name="map-marker-alt" size={24} color="red" />
                                </TouchableOpacity>
                                <Text className="pl-2">{item.warehouse.address}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
                                <TouchableOpacity
                                    style={AppStyle.StyleProfile.btn_update_post}
                                    onPress={() => navigation.navigate("UpdatePostOwner", {idPost: item._id})}>
                                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Sửa bài viết</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={AppStyle.StyleProfile.btn_delete}
                                    onPress={() => {
                                        Alert.alert(
                                            "",
                                            "Bạn có muốn xóa bài viết này không?",
                                            [
                                                {
                                                    text: "Cancel",
                                                    style: "cancel",
                                                },
                                                {
                                                    text: "OK", onPress: () => DeleteBlogOwner(item._id)
                                                },
                                            ],
                                            { cancelable: false }
                                        )
                                    }}
                                >
                                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Xóa bài viết</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
        );
    };
    return (
        <View className="flex-auto h-full">
            {/* <TouchableOpacity
                style={AppStyle.StyleProfile.btn_logout}
                onPress={() => navigation.navigate("AddPostOwner")}
            >
                <Text style={{ color: "#fff" }}>Thêm bài viết</Text>
                <MaterialIcons name="navigate-next" size={20} color="#fff" />
            </TouchableOpacity> */}
            <FlatList
                data={blog}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => FlatListBlog(item)}
            />
            <TouchableOpacity
                className="absolute bottom-10 right-8 rounded-full"
                onPress={() => {
                    navigation.navigate("AddPostOwner");
                }}
            >
                <AntDesign name="pluscircleo" size={48} color="#E48F45" />
            </TouchableOpacity>
        </View>
    );
};

export default ListBlogPost;