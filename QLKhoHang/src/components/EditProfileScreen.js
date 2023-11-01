import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, Image, TextInput, TouchableOpacity, View } from 'react-native';
import AppStyle from '../theme';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function MoreScreen() {
    return (
        <View>
            <ScrollView>
                <View style={{ padding: 10, width: '100%', backgroundColor: '#000', height: 150 }}>
                    <TouchableOpacity>
                        <Image source={require('../assets/adaptive-icon.png')}
                            style={{ width: 30, height: 30 }}></Image>
                        <View></View>
                        <View></View>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Image source={require('../assets/z4808827650587_fafa60a0767258a5439166a29f8cdf0d.jpg')}
                        style={AppStyle.StyleProfile.avatar}></Image>
                    <TextInput
                        style={AppStyle.StyleProfile.name}
                        placeholder="Nhập tên họ"
                        keyboardType="default"
                    />
                    <TextInput
                        style={AppStyle.StyleProfile.email}
                        placeholder="Nhập email"
                        keyboardType="default"
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
                        placeholder="Nhập số điện thoại"
                        keyboardType="numeric"
                    />
                </View>
                <View style={AppStyle.StyleProfile.items}>
                    <Entypo name="address" size={20} color="black" />
                    <TextInput
                        placeholder="Nhập địa chỉ"
                        keyboardType="default"
                    />
                </View>
                <TouchableOpacity style={AppStyle.StyleProfile.btn_edit}>
                    <AntDesign name="edit" size={20} color="#fff" />
                    <Text style={{ color: '#fff' }}>CẬP NHẬT</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
