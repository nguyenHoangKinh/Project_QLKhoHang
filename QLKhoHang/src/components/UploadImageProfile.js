import { useContext, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Alert, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRoute } from '@react-navigation/native';
import Button from './Button';
import ImageViewer from './ImageViewer';
import AppStyle from '../theme';
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const PlaceholderImage = require('../assets/images/background-image.png');

export default function UploadImageProfile({ navigation }) {
  const { userInfo } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const route = useRoute();
  const image = route.params?.selectedImage;

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const formData = new FormData();
        formData.append('avatar', { uri: result.assets[0].uri, name: 'file.jpg', type: 'image/jpeg' });

        const cloudinaryResponse = await axios.put(
          `https://warehouse-management-api.vercel.app/v1/auth/update-account`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${userInfo.accessToken}`,
            },
            params: {
              id: userInfo.others._id
            }
          }
        );
        setSelectedImage(result.assets[0].uri)
        Alert.alert("Cập nhật hình ảnh thành công");
        navigation.navigate('EditProfileScreen', { avatar: selectedImage })
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  return (
    <View style={AppStyle.StyleImageUpload.container}>
      <View style={AppStyle.StyleImageUpload.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage ? selectedImage : image} />
      </View>
      <View style={AppStyle.StyleImageUpload.footerContainer}>
        <Button theme="primary" label="Chọn một hình ảnh" onPress={() =>
          Alert.alert(
            "",
            "Bạn có muốn cập nhật hình ảnh không?",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "OK", onPress: () => pickImage()
              },
            ],
            { cancelable: false }
          )
        } />
        <TouchableOpacity label="Use this photo" onPress={
          () => navigation.navigate('EditProfileScreen')
        }>
          <View style={AppStyle.StyleImageUpload.buttonContainer}>
            <View style={AppStyle.StyleImageUpload.button}>
              <Text style={AppStyle.StyleImageUpload.buttonLabel}>Quay Lại</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}