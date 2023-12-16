import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FlatList, Text, Image, TouchableOpacity, View, Alert, TextInput, Modal } from "react-native";
import { AntDesign, Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
import AppStyle from "../theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import axios from "axios";

const ListBlogPost = ({ navigation }) => {
    const { userInfo } = useContext(AuthContext);
    const [blog, setBlog] = useState({});
    const [comment, setComment] = useState({});
    const [message, setMessage] = useState("");
    const [idBlog, setIdBlog] = useState("");
    const [idComment, setIdComment] = useState("");
    const [commentUpdate, setCommentUpdate] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleComments, setIsModalVisibleComments] = useState(false);

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

    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    const handleModalComents = () => setIsModalVisibleComments(() => !isModalVisibleComments);

    const getComment = (idBlog) => {
        setIdBlog(idBlog);
        axios.get(`https://warehouse-management-api.vercel.app/v1/blog/comment/list-by-blog`, {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
            params: {
                idBlog: idBlog,
            },
        }).then((res) => {
            let comment = res.data.data;
            setComment(comment);
        }).catch((e) => {
            console.log(`get comment error ${e.res}`);
        });
    }

    const addComment = (message, idBlog) => {
        axios.post(`https://warehouse-management-api.vercel.app/v1/blog/comment/create`, { content: message },
            {
                headers: {
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
                params: {
                    idBlog: idBlog,
                },
            }).then((res) => {
                getComment(idBlog)
                setMessage("")
            }).catch((e) => {
                console.log(`add comment error ${e}`);
            });
    }

    const updateComment = (message, idComment) => {
        axios.put(`https://warehouse-management-api.vercel.app/v1/blog/comment/update`, { content: message },
            {
                headers: {
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
                params: {
                    idComment: idComment,
                },
            }).then((res) => {
                getComment(idBlog);
                handleModalComents();
            }).catch((e) => {
                console.log(`add comment error ${e}`);
            });
    }

    const deleteComment = (idComment) => {
        axios.delete(`https://warehouse-management-api.vercel.app/v1/blog/comment/delete`,
            {
                headers: {
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
                params: {
                    idComment: idComment,
                },
            }).then((res) => {
                getComment(idBlog)
            }).catch((e) => {
                console.log(`add comment error ${e}`);
            });
    };

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

    const formatTime = (time) => {
        const options = { hour: "numeric", minute: "numeric" };
        return new Date(time).toLocaleString("en-US", options);
    };

    const FlatListBlog = (item) => {
        return (
            <View className="ml-2 mr-2" style={(isModalVisibleComments ? { opacity: 0.4, marginBottom: 20 } : { opacity: 1, marginBottom: 20 })}>
                {item.images != "" ? (
                    <View className="pb-0.5">
                        <Image
                            source={{ uri: `${item.images[0]}`, }}
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
                            <FontAwesome5 name="map-marker-alt" size={24} color="red" />
                            <Text className="pl-2">{item.warehouse.address}</Text>
                        </View>
                        <View className="flex-row pt-1">
                            <TouchableOpacity
                                onPress={() => {
                                    getComment(item._id);
                                    handleModal();
                                }}>
                                <MaterialCommunityIcons name="comment-text-outline" size={24} color="black" />
                            </TouchableOpacity>
                            <Text className="pl-2">{item.comments.length}</Text>
                            <Text>      </Text>
                            <AntDesign name="like1" size={24} color="black" />
                            <Text className="pl-2">{item.likes.length}</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
                            <TouchableOpacity
                                style={AppStyle.StyleProfile.btn_update_post}
                                onPress={() => navigation.navigate("UpdatePostOwner", { idPost: item._id })}>
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
            </View>
        );
    };

    const FlatListComment = (item) => {
        return (
            <TouchableOpacity style={isModalVisibleComments ? { opacity: 0.4 } : { opacity: 1 }}>
                <View className="flex flex-col w-50 h-auto bg-slate-200 m-2 rounded-lg text-left p-2">
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text className="text-lg font-bold" style={{ flex: 1 }}>{item.account.username}</Text>
                        {userInfo.others._id.includes(item.account._id) && <Entypo name="edit" size={20} color="black" onPress={() =>{
                            handleModalComents();
                            setIdComment(item._id);
                            setCommentUpdate(item.content);
                        }} />}
                        <IconButton
                            style={{ marginRight: -10 }}
                            icon="trash-can"
                            iconColor="red"
                            onPress={() => deleteComment(item._id)}
                        />
                    </View>
                    <Text className="" style={{ fontSize: 15, marginLeft: 5, marginTop: -10 }}>{item.content}</Text>
                    <Text
                        style={{
                            textAlign: "right",
                            fontSize: 9,
                            color: "gray",
                            marginTop: 5,
                        }}
                    >
                        {formatTime(item.createdAt)}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View className="flex-auto h-full" style={{marginBottom: 10}}>
            <FlatList
                data={blog}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => FlatListBlog(item)}
            />

            <TouchableOpacity
                className="absolute bottom-10 right-8 rounded-full"
                onPress={() => { navigation.navigate("AddPostOwner"); }}
            >
                <AntDesign name="pluscircleo" size={48} color="#E48F45" />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setIsModalVisible(!isModalVisible);
                }}
            >
                <View style={{ flex: 1, backgroundColor: '#00000aa', justifyContent: 'flex-end' }}>
                    <View style={AppStyle.StyleListBlogOwner.modal}>
                        <TouchableOpacity
                            style={{ marginLeft: 350 }}
                            onPress={() => { handleModal(); }}
                        >
                            <Ionicons
                                name="close-outline"
                                size={35}
                                color="#000"
                                style={AppStyle.StyleOderList.textStyle}
                            />
                        </TouchableOpacity>
                        <Text style={AppStyle.StyleListBlogOwner.title_modal}>
                            Bình luận
                        </Text>
                        <FlatList
                            data={comment}
                            renderItem={({ item, index }) => FlatListComment(item)}
                            extraData={comment}
                            keyExtractor={(item) => item._id}
                        />
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center' ,height: 50 }}>
                            <TextInput
                                style={{ fontSize: 18 }}
                                className=" w-full h-9"
                                placeholder="Nhập bình luận... "
                                value={message}
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(text) => setMessage(text)}
                            />
                            <TouchableOpacity
                                onPress={() => { addComment(message, idBlog) }}
                                className="absolute right-0 top-1.5"
                                style={{ marginTop: 10 }}
                            >
                                <Ionicons className="" name="send" size={23} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisibleComments}
                onRequestClose={() => {
                    setIsModalVisibleComments(!isModalVisibleComments);
                }}
            >
                <View style={AppStyle.StyleListBlogOwner.update_comment}>
                    <View style={AppStyle.StyleListBlogOwner.update_comment_bg}>
                        <TextInput
                            style={AppStyle.StyleListBlogOwner.input_comment}
                            placeholder={commentUpdate}
                            value={message}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(text) => setCommentUpdate(text)}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={AppStyle.StyleProfile.btn_comment}
                                onPress={() => updateComment(commentUpdate, idComment)}
                            >
                                <Text style={{ color: "#fff" }}>Sửa</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={AppStyle.StyleProfile.btn_comment}
                                onPress={() => handleModalComents()}
                            >
                                <Text style={{ color: "#fff" }}>Thoát</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ListBlogPost;