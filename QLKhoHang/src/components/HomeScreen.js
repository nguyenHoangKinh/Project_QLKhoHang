import React from "react";
import AppStyle from '../theme';
import {
    View,
    Text,
    Image
} from 'react-native'
export default function HomeScreen() {
    return (
        <View style={AppStyle.StyleHome.container}>
            <Text style={AppStyle.StyleHome.topHome}>
                QUẢN LÝ KHO HÀNG
            </Text>
            <View style={AppStyle.StyleHome.image_name}>
                <Image
                    style={AppStyle.StyleHome.image}
                    source={require('../assets/z4808827650587_fafa60a0767258a5439166a29f8cdf0d.jpg')}
                />
                <View style={AppStyle.StyleHome.name_email}>
                    <Text style={AppStyle.StyleHome.name}>Họ và tên</Text>
                    <Text style={AppStyle.StyleHome.email}>Email</Text>
                </View>

            </View>

        </View>
    );
}
