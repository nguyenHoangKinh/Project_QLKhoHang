import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, Image, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import AppStyle from '../theme';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function ProfileScreen({navigation}) {

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
          <Text style={AppStyle.StyleProfile.name}>Tên Chủ Kho</Text>
          <Text style={AppStyle.StyleProfile.email}>Email</Text>
        </View>
        <View style={AppStyle.StyleProfile.items}>
          <FontAwesome name="bank" size={20} color="black" />
          <Text>Số tài khoản</Text>
        </View>
        <View style={AppStyle.StyleProfile.items}>
          <Entypo name="phone" size={20} color="black" />
          <Text>Số điện thoại</Text>
        </View>
        <View style={AppStyle.StyleProfile.items}>
          <Entypo name="address" size={20} color="black" />
          <Text>Địa chỉ</Text>
        </View>
        <View style={AppStyle.StyleProfile.items}>
          <FontAwesome5 name="warehouse" size={20} color="black" />
          <Text>Tổng số kho</Text>
        </View>
        <View style={AppStyle.StyleProfile.items}>
          <MaterialIcons name="house-siding" size={20} color="black" />
          <Text>Kho đang được thuê</Text>
        </View>
        <TouchableOpacity
          style={AppStyle.StyleProfile.btn_edit}
          onPress={
            ()=>navigation.navigate('EditProfileScreen')
            }>
          <AntDesign name="edit" size={20} color="#fff" />
          <Text style={{ color: '#fff' }}>Cập nhật thông tin cá nhân</Text>

        </TouchableOpacity>
        <TouchableOpacity style={AppStyle.StyleProfile.btn_logout}>
          <MaterialCommunityIcons name="logout" size={20} color="#fff" />
          <Text style={{ color: '#fff' }}>Đăng Xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
