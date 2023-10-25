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
            <Text>HomeScreen</Text>
        </View>
    );
}
