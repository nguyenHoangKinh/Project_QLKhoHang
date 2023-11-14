import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { ScrollView, Text, Image, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import AppStyle from '../theme';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from "../context/AuthContext";

export default function ProfileScreen({navigation}) {
  const { userInfo, splashLoading, logout } = useContext(AuthContext);
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
          <Image source={{uri: `${userInfo.others.avatar}`}}
            style={AppStyle.StyleProfile.avatar}></Image>
          <Text style={AppStyle.StyleProfile.name}>{userInfo.others.username}</Text>
          <Text style={AppStyle.StyleProfile.email}>{userInfo.others.email}</Text>
        </View>
        <View style={AppStyle.StyleProfile.items}>
          <FontAwesome name="bank" size={20} color="black" style={{marginRight: 10}}/>
          <Text>Số tài khoản</Text>
        </View>
        <View style={AppStyle.StyleProfile.items}>
          <Entypo name="phone" size={20} color="black" style={{marginRight: 10}}/>
          <Text>{userInfo.others.phone}</Text>
        </View>
        <View style={AppStyle.StyleProfile.items}>
          <Entypo name="address" size={20} color="black" style={{marginRight: 10}}/>
          <Text>{userInfo.others.address}</Text>
        </View>
        <View style={AppStyle.StyleProfile.items}>
          <FontAwesome5 name="warehouse" size={20} color="black" style={{marginRight: 10}}/>
          {/* <Text>{userInfo.others.warehouses.length}</Text> */}
        </View>
        <TouchableOpacity
          style={AppStyle.StyleProfile.btn_edit}
          onPress={
            ()=>navigation.navigate('EditProfileScreen')
            }>
          <AntDesign name="edit" size={20} color="#fff" />
          <Text style={{ color: '#fff' }}>Cập nhật thông tin cá nhân</Text>
        </TouchableOpacity>
        <TouchableOpacity style={AppStyle.StyleProfile.btn_logout} onPress={logout}>
          <MaterialCommunityIcons name="logout" size={20} color="#fff" />
          <Text style={{ color: '#fff' }}>Đăng Xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
