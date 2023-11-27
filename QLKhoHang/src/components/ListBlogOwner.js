import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FlatList, Pressable, StyleSheet, Text, Image, TouchableOpacity, View } from "react-native";
import { AntDesign, Ionicons, FontAwesome5 } from "@expo/vector-icons";
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
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
    return (
        <View className="flex-auto h-full">
            <TouchableOpacity
                style={AppStyle.StyleProfile.btn_logout}
                onPress={() => navigation.navigate("AddPostOwner")}
            >
                <Text style={{ color: "#fff" }}>Thêm bài viết</Text>
                <MaterialIcons name="navigate-next" size={20} color="#fff" />
            </TouchableOpacity>
            <FlatList
                data={blog}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => FlatListBlog(item)}
            />
        </View>
    );
};

export default ListBlogPost;