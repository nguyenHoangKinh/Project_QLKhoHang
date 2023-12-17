import { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, Image, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import AppStyle from '../theme';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../config";
import { useRoute } from '@react-navigation/native';

export default function EditProfileScreen({ navigation }) {
    const { userInfo, getProfile } = useContext(AuthContext);
    const [address, setAddress] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const route = useRoute();
    const avatar = route.params?.avatar;
    const [profile, setProfile] = useState();

    useEffect(() => {
        axios.get(`https://warehouse-management-api.vercel.app/v1/auth/profile`, {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
            params: {
                id: userInfo.others._id,
            },
        }).then((res) => {
            let profile = res.data.others;
            setProfile(profile);
        }).catch((e) => {
            console.log(`Get post error ${e.res}`);
        });
    }, [profile]);

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

    const updateProfile = (address, phone, email) => {
        axios
            .put(`${BASE_URL}/update-account`, {
                address: address,
                email: email,
                phone: phone,
            }, {
                headers: { Authorization: `Bearer ${userInfo.accessToken}` }
            })
            .then((res) => {
                console.log(res.data);
                getProfile();
                navigation.navigate('HomeNavigationOwner')
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
                {profile &&
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={
                            () => navigation.navigate('UploadImageProfile', { selectedImage: profile.avatar })
                        }>
                            <Image source={{ uri: `${avatar ? avatar : profile.avatar}` }}
                                style={AppStyle.StyleProfile.avatar}></Image>
                        </TouchableOpacity>
                        <Text style={AppStyle.StyleProfile.name}>{profile.username}</Text>
                        <TextInput
                            style={AppStyle.StyleProfile.email}
                            placeholder={profile.email}
                            keyboardType="default"
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                    </View>}
                {profile &&
                    <View style={AppStyle.StyleProfile.items}>
                        <Entypo name="phone" size={20} color="black" />
                        <TextInput
                            placeholder={profile.phone + ""}
                            keyboardType="numeric"
                            value={phone}
                            onChangeText={text => setPhone(text)}
                        />
                    </View>}
                {profile &&
                    <View style={AppStyle.StyleProfile.items}>
                        <Entypo name="address" size={20} color="black" />
                        <TextInput
                            placeholder={profile.address}
                            keyboardType="default"
                            value={address}
                            onChangeText={text => setAddress(text)}
                        />
                    </View>}
                <TouchableOpacity
                    style={AppStyle.StyleProfile.btn_edit}
                    onPress={() => {
                        (!address & !phone & !email & !avatar) ? showAlert() : updateProfile(address, phone, email)
                    }}>
                    <AntDesign name="edit" size={20} color="#fff" />
                    <Text style={{ color: '#fff' }}>CẬP NHẬT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={AppStyle.StyleProfile.btn_logout}
                    onPress={
                        () => navigation.navigate('HomeNavigationOwner')
                    }>
                    <Text style={{ color: '#fff' }}>HỦY</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
