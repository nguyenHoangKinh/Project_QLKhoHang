import { useContext, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, Image, TextInput, TouchableOpacity, View } from 'react-native';
import AppStyle from '../theme';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from "../context/AuthContext";

export default function EditProfileScreen({ navigation }) {
    const {userInfo, splashLoading, updateProfile, checkUpdate} = useContext(AuthContext);
    const [address, setAddress] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    
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
                    <Image source={{uri: `${userInfo.others.avatar}`}}
                        style={AppStyle.StyleProfile.avatar}></Image>
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
                    <FontAwesome name="bank" size={20} color="black" />
                    <TextInput
                        placeholder="Nhập số tài khoản"
                        keyboardType="numeric"
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
                        updateProfile(address, phone, email),
                        checkUpdate ? navigation.navigate("HomeNavigation") : console.log("Cap nhat that bai")
                    }}>
                    <AntDesign name="edit" size={20} color="#fff" />
                    <Text style={{ color: '#fff' }}>CẬP NHẬT</Text>
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
