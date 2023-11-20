import { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, Image, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import AppStyle from '../theme';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../config";
import { useRoute } from '@react-navigation/native';

export default function EditProfileScreen({ navigation }) {
    const { userInfo, splashLoading, getProfile } = useContext(AuthContext);
    const [address, setAddress] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const route = useRoute();
    const avatar = route.params?.nameImage;

    const showAlert = () =>
        Alert.alert(
            'Cập nhật thất bại',
            'Yêu cầu nhập thông tin cần cập nhật',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
        );

    const updateProfile = (address, phone, email, avatar) => {
        axios
            .put(`${BASE_URL}/update-account`, {
                address: address,
                email: email,
                phone: phone,
                avatar: avatar,
            }, {
                headers: { Authorization: `Bearer ${userInfo.accessToken}` }
            })
            .then((res) => {
                console.log(res.data);
                getProfile();
                navigation.navigate('Home')
            })
            .catch((e) => {
                Alert.alert(
                    'Cập nhật thất bại',
                    `${e.response.data.message}`,
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                        },
                    ],
                );
                console.log(`update error ${e.response.data.message}`);
            });
    };

    return (
        <View>
            <ScrollView>
                <View style={{ padding: 10, width: '100%', backgroundColor: '#000', height: 150 }}>
                    <TouchableOpacity>
                        <Image source={require('../assets/adaptive-icon.png')}
                            style={{ width: 30, height: 30 }}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={
                        () => navigation.navigate('UploadImageProfile', { selectedImage: userInfo.others.avatar })
                    }>
                        <Image source={{ uri: `${!avatar ? userInfo.others.avatar : avatar.assets[0].uri}` }}
                            style={AppStyle.StyleProfile.avatar}></Image>
                    </TouchableOpacity>
                    <Text style={AppStyle.StyleProfile.name}>{userInfo.others.username}</Text>
                    <TextInput
                        style={AppStyle.StyleProfile.email}
                        placeholder={userInfo.others.email}
                        keyboardType="default"
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                </View>
                <View style={AppStyle.StyleProfile.items}>
                    <Entypo name="phone" size={20} color="black" />
                    <TextInput
                        placeholder={userInfo.others.phone + ""}
                        keyboardType="numeric"
                        value={phone}
                        onChangeText={text => setPhone(text)}
                    />
                </View>
                <View style={AppStyle.StyleProfile.items}>
                    <Entypo name="address" size={20} color="black" />
                    <TextInput
                        placeholder={userInfo.others.address}
                        keyboardType="default"
                        value={address}
                        onChangeText={text => setAddress(text)}
                    />
                </View>
                <TouchableOpacity
                    style={AppStyle.StyleProfile.btn_edit}
                    onPress={() => {
                        (!address & !phone & !email & !avatar) ? showAlert() : updateProfile(address, phone, email, avatar)
                    }}>
                    <AntDesign name="edit" size={20} color="#fff" />
                    <Text style={{ color: '#fff' }}>CẬP NHẬT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={AppStyle.StyleProfile.btn_logout}
                    onPress={
                        () => navigation.navigate('Home')
                    }>
                    <Text style={{ color: '#fff' }}>HỦY</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
